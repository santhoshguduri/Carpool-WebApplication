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
using AutoMapper;

namespace Carpool.Services
{
    public class BookingService : Helper, IBookingService
    {
        public IRepositoryManager<Booking> _repository;

        private readonly IRepositoryManager<User> _userRepository;

        private readonly IRepositoryManager<Place> _placeRepository;

        private readonly IRepositoryManager<OfferRide> _rideOffersRepository;

        private readonly IMapper _mapper;

        private double PricePerKm = 10;

        public BookingService(IRepositoryManager<Booking> repository, IRepositoryManager<User> userRepository,IRepositoryManager<OfferRide> rideOffersRepository,IRepositoryManager<Place> placeRepository, IMapper mapper)
        {
            _repository = repository;
            _userRepository = userRepository;
            _rideOffersRepository = rideOffersRepository;
            _placeRepository = placeRepository;
            _mapper = mapper;
        }

        public void CreateRideBooking(RideBooking booking)
        {

            Booking rideBooking = _mapper.Map<RideBooking, Booking>(booking);
            rideBooking.Id = GenerateId();
            rideBooking.Status = BookingStatus.Requested;

            _repository.Post(rideBooking);

            User user = _userRepository.Get(rideBooking.BookingUserId);
            if (user != null)
            {
                user.LastBookingId = rideBooking.Id;
                _userRepository.Put(user);
            }

            OfferRide RideOffer = _rideOffersRepository.Get(booking.RideOfferId);
            if (RideOffer != null)
            {
                RideOffer.AvailableSeats = RideOffer.AvailableSeats - booking.Seats;
                _rideOffersRepository.Put(RideOffer);
            }
        }

        public RideDetails GetBooking(long bookingId)
        {
            Booking UserBooking = _repository.Get(bookingId);
            if (UserBooking != null)
            {
                RideDetails BookedRide = _mapper.Map<Booking, RideDetails>(UserBooking);
                BookedRide.Name = _userRepository.Get(_rideOffersRepository.Get(UserBooking.RideOfferId).HostId).Name;
                BookedRide.StartPoint = UserBooking.StartPoint.Split(",")[0];
                BookedRide.Destination = UserBooking.Destination.Split(",")[0];
                BookedRide.RideBookingDate = UserBooking.RideBookingDate.ToString("dd/MM/yyyy");
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
                            r.Route.Exists(e => e.AreaName == rideBooking.Destination) && r.HostId != userId && (
                            r.Route.FindIndex(e => e.AreaName == rideBooking.StartPoint) < r.Route.FindIndex(e => e.AreaName == rideBooking.Destination)) &&
                            r.Time == rideBooking.Time && r.AvailableSeats>=rideBooking.Seats &&
                            (DateTime.Compare(r.RideOfferedDate, rideBooking.RideBookingDate) == 0))
                .ToList();
            
            foreach (OfferRide ride in AvailableRides)
            {
                string[] Startpoint = ride.Route[0].AreaName.Split(',');
                string[] Destination = ride.Route[ride.Route.Count-1].AreaName.Split(',');

                RideDetails rideDetails = _mapper.Map<OfferRide, RideDetails>(ride);
                rideDetails.Name = _userRepository.Get(ride.HostId).Name;
                rideDetails.StartPoint = Startpoint[0];
                rideDetails.Destination = Destination[0];
                rideDetails.RideBookingDate = ride.RideOfferedDate.ToString("dd/MM/yyyy");
                rideDetails.RideFair = GetPrice(rideBooking.StartPoint, rideBooking.Destination);
                rideDetails.Seats = ride.AvailableSeats;

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
                RideDetails rideDetails = _mapper.Map<Booking, RideDetails>(userBooking);
                rideDetails.Name = _userRepository.Get(_rideOffersRepository.Get(_repository.GetAll().FirstOrDefault(r => r.Id == userBooking.Id).RideOfferId).HostId).Name;
                rideDetails.StartPoint = userBooking.StartPoint.Split(",")[0];
                rideDetails.Destination = userBooking.Destination.Split(",")[0];
                rideDetails.RideBookingDate = userBooking.RideBookingDate.ToString("dd/MM/yyyy");

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
                BookingResponse rideDetails = _mapper.Map<Booking, BookingResponse>(booking);
                rideDetails.Name = _userRepository.Get(booking.BookingUserId).Name;
                rideDetails.StartPoint = booking.StartPoint.Split(",")[0];
                rideDetails.Destination = booking.Destination.Split(",")[0];
                rideDetails.RideDate = booking.RideBookingDate.ToString("dd/MM/yyyy");

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
