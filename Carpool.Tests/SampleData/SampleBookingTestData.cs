using Models.DataModels;
using Models.RequestModels;
using Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Tests.SampleData
{
    internal class SampleBookingTestData
    {
        public RideBooking GetSampleRideBooking()
        {
            RideBooking rideBooking = new RideBooking()
            {
                StartPoint = "Ashoknagar",
                Destination = "Venkampet",
                Seats = 4,
                RideBookingDate = DateTime.Now.Date,
                Time = "3am-6am",
                RideFair = 500,
                RideOfferId = 5,
                BookingUserId = 19
            };
            return rideBooking;
        }

        public RequestBooking GetSampleBookingRequest()
        {
            RequestBooking booking = new RequestBooking()
            {
                StartPoint = "Ashoknagar",
                Destination = "Venkampet",
                RideBookingDate = DateTime.Now.Date,
                Seats = 2,
                Time = "3am-6am"
            };
            return booking;
        }

        public RideDetails GetSampleRideDetails()
        {
            RideDetails rideDetails = new RideDetails()
            {
                StartPoint = "Delhi",
                Destination = "Mumbai",
                Seats = 3,
                RideBookingDate = DateTime.Now.ToString(),
                Time = "3am-6am",
                RideFair = 500,
                RideOfferId = 5,
                Name = "santhu",
                Status = BookingStatus.Approved
            };
            return rideDetails;
        }

        public List<RideDetails> GetSampleRideDetailsList()
        {
            List<RideDetails> rides = new List<RideDetails>()
            {
                new RideDetails
                {
                    StartPoint = "Delhi",
                    Destination = "Mumbai",
                    Seats = 3,
                    RideBookingDate = DateTime.Now.ToString(),
                    Time = "3am-6am",
                    RideFair = 500,
                    RideOfferId = 5,
                    Name = "santhu",
                    Status = BookingStatus.Approved
                },
                new RideDetails
                {
                    StartPoint = "Hyderabad",
                    Destination = "Banglore",
                    Seats = 3,
                    RideBookingDate = DateTime.Now.ToString(),
                    Time = "12am-3am",
                    RideFair = 230,
                    RideOfferId = 5,
                    Name = "Naveen",
                    Status = BookingStatus.Approved
                }
            };
            return rides;
        }

        public Booking GetSampleBooking()
        {
            Booking TestBooking = new Booking()
            {
                StartPoint = "Ashoknagar",
                Destination = "Venkampet",
                Seats = 4,
                RideBookingDate = DateTime.Now.Date,
                Time = "3am-6am",
                RideFair = 500,
                RideOfferId = 5,
                BookingUserId = 19
            };
            return TestBooking;
        }

        public BookingResponse GetSampleBookingResponse()
        {
            BookingResponse response = new BookingResponse()
            {
                StartPoint = "Ashoknagar",
                Destination = "Venkampet",
                SeatsAvailable = 4,
                RideDate = DateTime.Now.Date.ToShortDateString(),
                RideTime = "3am-6am",
                Price = 500,
                Name = "Santhu"
            };
            return response;
        }

        public List<Booking> GetSampleBookings()
        {
            List<Booking> bookings = new List<Booking>()
            {
                new Booking
                {
                    StartPoint = "Ashoknagar",
                    Destination = "Venkampet",
                    Seats = 3,
                    RideBookingDate = DateTime.Now.Date,
                    Time = "3am-6am",
                    RideFair = 500,
                    RideOfferId = 20,
                    BookingUserId = 19,
                    Status = BookingStatus.Approved
                },
                new Booking
                {
                    StartPoint = "Mumbai",
                    Destination = "Delhi",
                    Seats = 2,
                    RideBookingDate = DateTime.Now.Date,
                    Time = "6am-9am",
                    RideFair = 230,
                    RideOfferId = 15,
                    BookingUserId = 20,
                    Status = BookingStatus.Requested
                }
            };
            return bookings;
        }
    }
}
