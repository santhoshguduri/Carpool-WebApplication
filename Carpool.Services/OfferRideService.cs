using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.DataModels;
using Models.ResponseModels;
using Models.RequestModels;
using Repository;


namespace Carpool.Services
{
    public class OfferRideService : Helper,IOfferRideService
    {
        private readonly IRepositoryManager<OfferRide> _repository;

        private readonly IRepositoryManager<Place> _routeRepository;

        private readonly IRepositoryManager<User> _userRepository;

        private readonly IRepositoryManager<Booking> _bookingRepository;


        public OfferRideService(IRepositoryManager<OfferRide> repository,IRepositoryManager<Place> routeRepository,IRepositoryManager<User> userRepository,IRepositoryManager<Booking> bookingRepository)
        {
            _repository = repository;
            _routeRepository = routeRepository;
            _userRepository = userRepository;
            _bookingRepository = bookingRepository;
        }


        public void CreateRideOffer(long userId, RideOffer rideOffer)
        {
            OfferRide NewRideOffer = new OfferRide
            {
                RideOfferId = GenerateId(),
                RideOfferedDate = rideOffer.RideOfferedDate,
                AvailableSeats = rideOffer.AvailableSeats,
                Time = rideOffer.Time,
                HostId = userId
            };
            _repository.Post(NewRideOffer);

            foreach(string area in rideOffer.Route)
            {
                Place NewPlace = new Place
                {
                    AreaName = area,
                    RideOfferId = NewRideOffer.RideOfferId
                };
                NewRideOffer.Route.Add(NewPlace);
            }
            _routeRepository.AddRange(NewRideOffer.Route);
            User user = _userRepository.Get(userId);
            user.LastOfferRideId = NewRideOffer.RideOfferId;
            _userRepository.Put(user);
        }

        public List<RideDetails> GetAllRidesOffered(long userId)
        {
            List<OfferRide> RideOffers = _repository.GetAll().Where(r => r.HostId == userId).ToList();
            List<RideDetails> UserRideBookings = new List<RideDetails>();
            foreach (OfferRide ride in RideOffers)
            {
                foreach(Booking rideBooking in _bookingRepository.GetAll().Where(r=>r.RideOfferId==ride.RideOfferId))
                {
                    RideDetails rideDetails = new RideDetails
                    {
                        Name = _userRepository.Get(rideBooking.BookingUserId).Name,
                        StartPoint = rideBooking.StartPoint.Split(",")[0],
                        Destination =rideBooking.Destination.Split(",")[0],
                        RideDate = rideBooking.RideBookingDate.ToString("dd/MM/yyyy"),
                        Price = rideBooking.RideFair,
                        SeatsAvailable = rideBooking.Seats,
                        RideTime = rideBooking.Time
                    };
                    UserRideBookings.Add(rideDetails);
                }
            }
            return UserRideBookings;
        }

    }
}
