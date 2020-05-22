using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataProvider.Data;
using Models.DataModels;
using Models.ResponseModels;
using Models.RequestModels;
using Carpool.Services;
using Microsoft.AspNetCore.Authorization;

namespace CarpoolApplication.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet("{userId}")]
        public  List<RideDetails> GetBookings([FromRoute]long userId)
        {
            return _bookingService.GetAllBookings(userId);
        }


        [HttpGet("{userId}")]
        public List<RideDetails> SearchAvailableRides([FromRoute]long userId,[FromQuery]string startPoint,[FromQuery]string destination,[FromQuery]int seats,[FromQuery]DateTime rideBookingDate,[FromQuery]string time)
        {
            RequestBooking booking = new RequestBooking()
            {
                StartPoint=startPoint,
                Destination=destination,
                Seats=seats,
                RideBookingDate=rideBookingDate,
                Time=time
            };
            return _bookingService.SearchAvailableRides(booking,userId);
        }

        [HttpGet("{bookingId}")]
        public RideDetails GetRide([FromRoute]long bookingId)
        {
            return _bookingService.GetBooking(bookingId);
        }

        [HttpPost]
        public void CreateBooking([FromBody]RideBooking booking)
        {
            _bookingService.CreateRideBooking(booking);
        }

        [HttpGet("{userId}")]
        public List<BookingResponse> GetBookingRequests(long userId)
        {
            return _bookingService.BookingRequests(userId);
        }

        [HttpPost]
        public void SetBookingStatus([FromQuery]long bookingId,[FromQuery]long rideOfferId,[FromQuery] BookingStatus status)
        {
            _bookingService.SetStatusOfBooking(bookingId, rideOfferId, status);
        }
    }
}
