using Models.DataModels;
using Models.RequestModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Tests.SampleData
{
    internal class SampleOfferRideTestData
    {
        public RideOffer GetSampleRideOfferDetails()
        {
            RideOffer ride = new RideOffer()
            {
                AvailableSeats = 2,
                CarId = 2,
                RideOfferedDate = DateTime.Now.Date,
                Route = new List<string>() { "Ashoknagar", "Sircilla", "Venkampet" },
                Time = "3am-6am",
            };
            return ride;
        }

        public OfferRide GetSampleRideOffer()
        {
            OfferRide TestRide = new OfferRide()
            {
                AvailableSeats = 3,
                CarId = 2,
                HostId = 22,
                RideOfferedDate = DateTime.Now.Date,
                RideOfferId = 20,
                Time = "3am-6am",
                Route = new List<Place>()
                {
                    new Place
                    {
                        AreaId = 0,
                        AreaName = "Ashoknagar",
                        RideOfferId = 0
                    },
                    new Place
                    {
                        AreaId = 0,
                        AreaName = "Sircilla",
                        RideOfferId = 0
                    },
                    new Place
                    {
                        AreaId = 0,
                        AreaName = "Venkampet",
                        RideOfferId = 0
                    }
                },
            };
            return TestRide;
        }

        public List<OfferRide> GetSampleRideOffersList()
        {
            List<OfferRide> rides = new List<OfferRide>()
            {
                new OfferRide
                {
                    AvailableSeats = 3,
                    CarId = 2,
                    HostId = 22,
                    RideOfferedDate = DateTime.Now.Date,
                    RideOfferId = 20,
                    Time = "3am-6am"
                },
                new OfferRide
                {
                    AvailableSeats = 2,
                    CarId = 4,
                    HostId = 11,
                    RideOfferedDate = DateTime.Now.Date,
                    RideOfferId = 10,
                    Time = "3am-6am"
                }
            };
            return rides;
        }
    }
}
