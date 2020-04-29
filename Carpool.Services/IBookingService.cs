using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.DataModels;
using Models.ResponseModels;
using Models.RequestModels;

namespace Carpool.Services
{
    public interface IBookingService
    {
        void CreateRideBooking(RideBooking RideBooking);

        RideDetails GetBooking(long bookingId);

        List<RideDetails> SearchAvailableRides(RequestBooking rideBooking,long userId);

        List<RideDetails> GetAllBookings(long userId);

        List<BookingResponse> BookingRequests(long userId);

        void SetStatusOfBooking(long bookingId,long rideOfferId, BookingStatus status);

    }
}
