using Autofac.Extras.Moq;
using AutoMapper;
using Carpool.Services;
using Carpool.Tests.SampleData;
using CarpoolApplication.MappingProfiles;
using Models.DataModels;
using Models.RequestModels;
using Models.ResponseModels;
using Moq;
using Repository;
using System;
using System.Collections.Generic;
using Xunit;

namespace Carpool.Tests.ServiceProvidersTests
{
    public class BookingServicesTests
    {
        SampleBookingTestData BookingTestingData = new SampleBookingTestData();

        SampleUserTestData UserTestingData = new SampleUserTestData();

        SampleOfferRideTestData RideOfferTestingData = new SampleOfferRideTestData();

        SampleRouteTestData PlacesTestingData = new SampleRouteTestData();

        [Fact]
        public void CreateRideBooking_ShouldWork()
        {
            Booking SampleBooking = BookingTestingData.GetSampleBooking();

            User SampleUser = UserTestingData.GetSampleUser();

            OfferRide SampleRide = RideOfferTestingData.GetSampleRideOffer();

            RideBooking SampleRideRequest = BookingTestingData.GetSampleRideBooking();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<BookingService>();

                mock.Mock<IRepositoryManager<Booking>>().Setup(x => x.Post(SampleBooking));

                mock.Mock<IMapper>().Setup(x => x.Map<RideBooking, Booking>(SampleRideRequest)).Returns(SampleBooking).Verifiable();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Get(19)).Returns(SampleUser).Verifiable();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Put(SampleUser)).Verifiable();

                mock.Mock<IRepositoryManager<OfferRide>>().Setup(x => x.Get(5)).Returns(SampleRide).Verifiable();

                mock.Mock<IRepositoryManager<OfferRide>>().Setup(x => x.Put(SampleRide)).Verifiable();

                TestService.CreateRideBooking(SampleRideRequest);

                mock.Mock<IRepositoryManager<Booking>>().Verify(x => x.Post(SampleBooking), Times.Exactly(1));

            }
        }

        [Fact]
        public void GetBooking_ShouldWork()
        {
            Booking SampleBooking = BookingTestingData.GetSampleBooking();

            User SampleUser = UserTestingData.GetSampleUser();

            OfferRide SampleRide = RideOfferTestingData.GetSampleRideOffer();

            RideDetails SampleRideDetails = BookingTestingData.GetSampleRideDetails();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<BookingService>();

                mock.Mock<IRepositoryManager<Booking>>().Setup(x => x.Get(1)).Returns(SampleBooking);

                mock.Mock<IMapper>().Setup(x => x.Map<Booking, RideDetails>(SampleBooking)).Returns(SampleRideDetails).Verifiable();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Get(22)).Returns(SampleUser).Verifiable();

                mock.Mock<IRepositoryManager<OfferRide>>().Setup(x => x.Get(5)).Returns(SampleRide).Verifiable();

                RideDetails Actual = TestService.GetBooking(1);

                Assert.True(Actual.Status == BookingStatus.Approved);

                mock.Mock<IRepositoryManager<Booking>>().Verify(x => x.Get(1), Times.Exactly(1));

                mock.Mock<IRepositoryManager<User>>().Verify(x => x.Get(22), Times.Exactly(1));
            }
        }

        [Fact]
        public void SearchAvailableRides_ShouldWork()
        {
            User SampleUser = UserTestingData.GetSampleUser();

            RideDetails SampleRideDetails = BookingTestingData.GetSampleRideDetails();

            List<OfferRide> SampleListOfOffers = RideOfferTestingData.GetSampleRideOffersList();

            List<Place> SampleListOfPlaces = PlacesTestingData.GetSamplePlacesList();

            RequestBooking SampleBookingRequest = BookingTestingData.GetSampleBookingRequest();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<BookingService>();

                mock.Mock<IRepositoryManager<Place>>().Setup(x => x.GetAll()).Returns(SampleListOfPlaces);

                mock.Mock<IMapper>().Setup(x => x.Map<OfferRide, RideDetails>(SampleListOfOffers[0])).Returns(SampleRideDetails).Verifiable();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Get(22)).Returns(SampleUser).Verifiable();

                mock.Mock<IRepositoryManager<OfferRide>>().Setup(x => x.GetAll()).Returns(SampleListOfOffers).Verifiable();

                TestService.SearchAvailableRides(SampleBookingRequest,44);

                mock.Mock<IRepositoryManager<Place>>().Verify(x => x.GetAll(), Times.Exactly(2));

                mock.Mock<IRepositoryManager<User>>().Verify(x => x.Get(22), Times.Exactly(1));
            }
        }

        [Fact]
        public void GetAllBooking_ShouldWork()
        {
            List<Booking> SampleBookings = BookingTestingData.GetSampleBookings();

            User SampleUser = UserTestingData.GetSampleUser();

            OfferRide SampleRide = RideOfferTestingData.GetSampleRideOffer();

            RideDetails SampleRideDetails = BookingTestingData.GetSampleRideDetails();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<BookingService>();

                mock.Mock<IRepositoryManager<Booking>>().Setup(x => x.GetAll()).Returns(SampleBookings);

                mock.Mock<IMapper>().Setup(x => x.Map<Booking, RideDetails>(SampleBookings[0])).Returns(SampleRideDetails).Verifiable();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Get(22)).Returns(SampleUser).Verifiable();

                mock.Mock<IRepositoryManager<OfferRide>>().Setup(x => x.Get(20)).Returns(SampleRide).Verifiable();

                List<RideDetails> Actual = TestService.GetAllBookings(19);

                Assert.Equal("3am-6am", Actual[0].Time);

                mock.Mock<IRepositoryManager<Booking>>().Verify(x => x.GetAll(), Times.Exactly(2));

                mock.Mock<IRepositoryManager<User>>().Verify(x => x.Get(22), Times.Exactly(1));
            }
        }

        [Fact]
        public void GetBookingRequests_ShouldWork()
        {
            List<Booking> SampleBookings = BookingTestingData.GetSampleBookings();

            User SampleUser = UserTestingData.GetSampleUser();

            BookingResponse SampleBookingResponse = BookingTestingData.GetSampleBookingResponse();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<BookingService>();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Get(19)).Returns(SampleUser).Verifiable();
                
                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Get(20)).Returns(SampleUser).Verifiable();

                mock.Mock<IRepositoryManager<Booking>>().Setup(x => x.GetAll()).Returns(SampleBookings);

                mock.Mock<IMapper>().Setup(x => x.Map<Booking, BookingResponse>(SampleBookings[1])).Returns(SampleBookingResponse).Verifiable();

                TestService.BookingRequests(19);

                mock.Mock<IRepositoryManager<Booking>>().Verify(x => x.GetAll(), Times.Exactly(1));

                mock.Mock<IRepositoryManager<User>>().Verify(x => x.Get(20), Times.Exactly(1));
            }
        }

        [Fact]
        public void SetBookingStatus_ShouldWork()
        {
            Booking SampleBooking = BookingTestingData.GetSampleBooking();

            User SampleUser = UserTestingData.GetSampleUser();

            OfferRide SampleRide = RideOfferTestingData.GetSampleRideOffer();

            RideDetails SampleRideDetails = BookingTestingData.GetSampleRideDetails();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<BookingService>();

                mock.Mock<IRepositoryManager<Booking>>().Setup(x => x.Get(1)).Returns(SampleBooking).Verifiable();
                
                mock.Mock<IRepositoryManager<Booking>>().Setup(x => x.Put(SampleBooking)).Verifiable();

                mock.Mock<IRepositoryManager<OfferRide>>().Setup(x => x.Get(15)).Returns(SampleRide).Verifiable();
                
                mock.Mock<IRepositoryManager<OfferRide>>().Setup(x => x.Put(SampleRide)).Verifiable();

                TestService.SetStatusOfBooking(1,15,BookingStatus.Rejected);

                mock.Mock<IRepositoryManager<Booking>>().Verify(x => x.Put(SampleBooking), Times.Exactly(1));

                mock.Mock<IRepositoryManager<OfferRide>>().Verify(x => x.Get(15), Times.Exactly(1));
            }
        }
    }
}
