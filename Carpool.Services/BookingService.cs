using Models.DataModels;
using Models.ResponseModels;
using Models.RequestModels;
using Newtonsoft.Json;
using Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Carpool.Services
{
    public class BookingService : Helper, IBookingService
    {
        private readonly IRepositoryManager<Booking> _repository;

        private readonly IRepositoryManager<User> _userRepository;

        private readonly IRepositoryManager<Place> _placeRepository;

        private readonly IRepositoryManager<OfferRide> _rideOffersRepository;

        private double PricePerKm = 10;

        public BookingService(IRepositoryManager<Booking> repository, IRepositoryManager<User> userRepository,IRepositoryManager<OfferRide> rideOffersRepository,IRepositoryManager<Place> placeRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
            _rideOffersRepository = rideOffersRepository;
            _placeRepository = placeRepository;
        }

        public void CreateRideBooking(RideBooking booking)
        {
            Booking rideBooking = new Booking()
            {
                Id = GenerateId(),
                Status = BookingStatus.Requested,
                StartPoint=booking.StartPoint,
                Destination=booking.Destination,
                Seats=booking.Seats,
                RideBookingDate=booking.RideBookingDate,
                Time=booking.Time,
                RideFair=booking.RideFair,
                RideOfferId=booking.RideOfferId,
                BookingUserId = booking.BookingUserId
            };
            _repository.Post(rideBooking);

            User user = _userRepository.Get(rideBooking.BookingUserId);
            user.LastBookingId = rideBooking.Id;
            _userRepository.Put(user);

            OfferRide RideOffer = _rideOffersRepository.Get(booking.RideOfferId);
            RideOffer.AvailableSeats = RideOffer.AvailableSeats - booking.Seats;
            _rideOffersRepository.Put(RideOffer);
        }

        public RideDetails GetBooking(long bookingId)
        {
            Booking UserBooking = _repository.Get(bookingId);
            if (UserBooking != null)
            {
                RideDetails BookedRide = new RideDetails
                {
                    Name = _userRepository.Get(_rideOffersRepository.Get(UserBooking.RideOfferId).HostId).Name,
                    StartPoint = UserBooking.StartPoint.Split(",")[0],
                    Destination = UserBooking.Destination.Split(",")[0],
                    RideDate = UserBooking.RideBookingDate.ToString("dd/MM/yyyy"),
                    Price = UserBooking.RideFair,
                    SeatsAvailable = UserBooking.Seats,
                    RideTime = UserBooking.Time,
                    Status = UserBooking.Status
                };
                return BookedRide;
            }
            else
            {
                return null;
            }
        }

        public List<RideDetails> SearchAvailableRides(RequestBooking rideBooking ,long userId)
        {
            List<RideDetails> Rides = new List<RideDetails>();
            List<OfferRide> TotalRides = _rideOffersRepository.GetAll().ToList();
            TotalRides.ForEach(e => e.Route = _placeRepository.GetAll().Where(r => r.RideOfferId == e.RideOfferId).ToList());
            List<OfferRide> AvailableRides = TotalRides
                .Where(r => r.Route.Exists(e => e.AreaName == rideBooking.StartPoint) && 
                            r.Route.Exists(e => e.AreaName == rideBooking.Destination) && r.HostId != userId &&
                            r.Route.FindIndex(e => e.AreaName == rideBooking.StartPoint) < r.Route.FindIndex(e => e.AreaName == rideBooking.Destination) &&
                            r.Time == rideBooking.Time && r.AvailableSeats>=rideBooking.Seats &&
                            DateTime.Compare(r.RideOfferedDate, rideBooking.RideBookingDate) == 0)
                .ToList();
            
            foreach (OfferRide ride in AvailableRides)
            {
                string[] Startpoint = ride.Route[0].AreaName.Split(',');
                string[] Destination = ride.Route[ride.Route.Count-1].AreaName.Split(',');
                
                RideDetails rideDetails = new RideDetails
                {
                    RideOfferId = ride.RideOfferId,
                    Name = _userRepository.Get(ride.HostId).Name,
                    StartPoint = Startpoint[0],
                    Destination = Destination[0],
                    RideDate = ride.RideOfferedDate.ToString("dd/MM/yyyy"),
                    Price = GetPrice(ride.Route[0].AreaName,ride.Route[ride.Route.Count-1].AreaName),
                    SeatsAvailable = ride.AvailableSeats,
                    RideTime = ride.Time
                };
                Rides.Add(rideDetails);
            }
            return Rides;
        }

        public List<RideDetails> GetAllBookings(long userId)
        {
            List<Booking> UserBookings = _repository.GetAll().Where(r=>r.BookingUserId == userId && r.Status != BookingStatus.Requested).ToList();
            List<RideDetails> UserRideBookings= new List<RideDetails>();
            foreach(Booking userBooking in UserBookings)
            {
                RideDetails rideDetails = new RideDetails
                {
                    Name = _userRepository.Get(_rideOffersRepository.Get(_repository.GetAll().FirstOrDefault(r=>r.Id==userBooking.Id).RideOfferId).HostId).Name,
                    StartPoint = userBooking.StartPoint.Split(",")[0],
                    Destination = userBooking.Destination.Split(",")[0],
                    RideDate = userBooking.RideBookingDate.ToString("dd/MM/yyyy"),
                    Price = userBooking.RideFair,
                    SeatsAvailable = userBooking.Seats,
                    RideTime = userBooking.Time,
                    Status=userBooking.Status
                };
                UserRideBookings.Add(rideDetails);
            }
            return UserRideBookings;
        }

        private  double GetPrice(string start, string end)
        {
            string url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + start + "&destinations=" + end + "&mode=driving&key=AIzaSyB3mJ4gmoEDfSjFISRXmngMlZarF0s6XcY";
            HttpWebRequest WebReq = (HttpWebRequest)WebRequest.Create(string.Format(url));

            WebReq.Method = "GET";

            HttpWebResponse WebResp = (HttpWebResponse)WebReq.GetResponse();

            string jsonString;
            using (Stream stream = WebResp.GetResponseStream())   
            {
                StreamReader reader = new StreamReader(stream, System.Text.Encoding.UTF8);
                jsonString = reader.ReadToEnd();
            }

            dynamic data = JsonConvert.DeserializeObject(jsonString);

            double Distance = data.rows[0].elements[0].distance.value;
            double Price =  Distance * PricePerKm/1000;
            return Price;
        }

        public List<BookingResponse> BookingRequests(long userId)
        {
            User user = _userRepository.Get(userId);
            List<Booking> rideBookings = _repository.GetAll().Where(r => r.RideOfferId == user.LastOfferRideId && r.Status==BookingStatus.Requested).ToList();
            List<BookingResponse> RideBookingResponses = new List<BookingResponse>();
            foreach(Booking booking in rideBookings)
            {
                BookingResponse rideDetails = new BookingResponse
                {
                    BookingId = booking.Id,
                    Name = _userRepository.Get(booking.BookingUserId).Name,
                    StartPoint = booking.StartPoint.Split(",")[0],
                    Destination = booking.Destination.Split(",")[0],
                    RideDate = booking.RideBookingDate.ToString("dd/MM/yyyy"),
                    RideTime=booking.Time,
                    Price=booking.RideFair,
                    SeatsAvailable = booking.Seats
                };
                RideBookingResponses.Add(rideDetails);
            }
            return RideBookingResponses;
        }

        public void SetStatusOfBooking(long bookingId, long rideOfferId, BookingStatus status)
        {
            Booking UserBooking = _repository.Get(bookingId);
            UserBooking.Status = status;
            _repository.Put(UserBooking);
            if(status == BookingStatus.Rejected)
            {
                OfferRide RideOffer = _rideOffersRepository.Get(rideOfferId);
                RideOffer.AvailableSeats = RideOffer.AvailableSeats + UserBooking.Seats;
                _rideOffersRepository.Put(RideOffer);
            }
        }
    }
}
