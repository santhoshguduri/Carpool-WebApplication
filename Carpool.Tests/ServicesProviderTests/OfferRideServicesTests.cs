using Autofac.Extras.Moq;
using AutoMapper;
using Carpool.Services;
using Carpool.Tests.SampleData;
using Models.DataModels;
using Models.RequestModels;
using Models.ResponseModels;
using Moq;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace Carpool.Tests.ServiceProvidersTests
{
    public class OfferRideServicesTests
    {
        SampleBookingTestData BookingTestingData = new SampleBookingTestData();

        SampleUserTestData UserTestingData = new SampleUserTestData();

        SampleOfferRideTestData RideOfferTestingData = new SampleOfferRideTestData();

        SampleRouteTestData PlacesTestingData = new SampleRouteTestData();

        [Fact]
        public void CreateRideOffer_ShouldWork()
        {
            RideOffer SampleRideOffer = RideOfferTestingData.GetSampleRideOfferDetails();

            User SampleUser = UserTestingData.GetSampleUser();

            OfferRide SampleRide = RideOfferTestingData.GetSampleRideOffer();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<OfferRideService>();

                mock.Mock<IRepositoryManager<Place>>().Setup(x => x.AddRange(SampleRide.Route));

                mock.Mock<IMapper>().Setup(x => x.Map<RideOffer, OfferRide>(SampleRideOffer)).Returns(SampleRide).Verifiable();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Get(19)).Returns(SampleUser).Verifiable();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Put(SampleUser)).Verifiable();

                mock.Mock<IRepositoryManager<OfferRide>>().Setup(x => x.Post(SampleRide)).Verifiable();

                TestService.CreateRideOffer(19,SampleRideOffer);

                mock.Mock<IRepositoryManager<OfferRide>>().Verify(x => x.Post(SampleRide), Times.Exactly(1));

            }
        }

        [Fact]
        public void GetAllRidesOffered_ShouldWork()
        {
            RideOffer SampleRideOffer = RideOfferTestingData.GetSampleRideOfferDetails();

            User SampleUser = UserTestingData.GetSampleUser();

            List<OfferRide> SampleRides = RideOfferTestingData.GetSampleRideOffersList();

            Booking SampleBooking = BookingTestingData.GetSampleBooking();

            RideDetails SampleRideDetails = BookingTestingData.GetSampleRideDetails();

            List<Booking> SampleBookings = BookingTestingData.GetSampleBookings();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<OfferRideService>();

                mock.Mock<IMapper>().Setup(x => x.Map<Booking, RideDetails>(SampleBookings[0])).Returns(SampleRideDetails).Verifiable();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Get(19)).Returns(SampleUser).Verifiable();

                mock.Mock<IRepositoryManager<OfferRide>>().Setup(x => x.GetAll()).Returns(SampleRides).Verifiable();
                
                mock.Mock<IRepositoryManager<Booking>>().Setup(x => x.GetAll()).Returns(SampleBookings).Verifiable();

                TestService.GetAllRidesOffered(22);

                mock.Mock<IRepositoryManager<OfferRide>>().Verify(x => x.GetAll(), Times.Exactly(1));

            }
        }
    }
}
