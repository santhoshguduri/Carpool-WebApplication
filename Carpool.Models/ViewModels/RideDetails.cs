using System;
using System.Collections.Generic;
using System.Text;
using Models.DataModels;

namespace Models.ResponseModels
{
    public class RideDetails
    {
        public long RideOfferId { get; set; }

        public string Name { get; set; }

        public string StartPoint { get; set; }

        public string Destination { get; set; }

        public string RideBookingDate { get; set; }

        public string Time { get; set; }

        public double RideFair { get; set; }

        public int Seats { get; set; }

        public BookingStatus Status { get; set; }
    }
}
