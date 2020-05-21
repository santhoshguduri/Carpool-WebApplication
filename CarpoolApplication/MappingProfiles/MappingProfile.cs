using AutoMapper;
using Models.DataModels;
using Models.RequestModels;
using Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpoolApplication.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RideBooking, Booking>();
            CreateMap<Booking, RideDetails>();
            CreateMap<OfferRide, RideDetails>();
            CreateMap<Booking, BookingResponse>();
            CreateMap<User, ProfileDetails>();
            CreateMap<RideOffer, OfferRide>();
            CreateMap<Booking, RideDetails>();
        }
    }
}
