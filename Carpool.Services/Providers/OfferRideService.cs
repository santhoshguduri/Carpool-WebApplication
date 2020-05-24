using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.DataModels;
using Models.ResponseModels;
using Models.RequestModels;
using Repository;
using AutoMapper;

namespace Carpool.Services
{
    public class OfferRideService : Helper,IOfferRideService
    {
        private readonly IRepositoryManager<OfferRide> _repository;

        private readonly IRepositoryManager<Place> _routeRepository;

        private readonly IRepositoryManager<User> _userRepository;

        private readonly IRepositoryManager<Booking> _bookingRepository;

        private readonly IMapper _mapper;


        public OfferRideService(IRepositoryManager<OfferRide> repository,IRepositoryManager<Place> routeRepository,IRepositoryManager<User> userRepository,IRepositoryManager<Booking> bookingRepository,IMapper mapper)
        {
            _repository = repository;
            _routeRepository = routeRepository;
            _userRepository = userRepository;
            _bookingRepository = bookingRepository;
            _mapper = mapper;
        }


        public void CreateRideOffer(long userId, RideOffer rideOffer)
        {
            OfferRide NewRideOffer = _mapper.Map<RideOffer, OfferRide>(rideOffer);
            NewRideOffer.RideOfferId = GenerateId();
            NewRideOffer.HostId = userId;

            _repository.Post(NewRideOffer);

            foreach(string area in rideOffer.NormalRoute)
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
                    RideDetails rideDetails = _mapper.Map<Booking, RideDetails>(rideBooking);
                    rideDetails.Name = _userRepository.Get(rideBooking.BookingUserId).Name;
                    rideDetails.StartPoint = rideBooking.StartPoint.Split(",")[0];
                    rideDetails.Destination = rideBooking.Destination.Split(",")[0];
                    rideDetails.RideBookingDate = rideBooking.RideBookingDate.ToString("dd/MM/yyyy");
                    UserRideBookings.Add(rideDetails);
                }
            }
            return UserRideBookings;
        }

    }
}
