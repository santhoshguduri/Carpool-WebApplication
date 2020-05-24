using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ResponseModels
{
    public class BookingResponse
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string StartPoint { get; set; }

        public string Destination { get; set; }

        public string RideBookingDate { get; set; }

        public string Time { get; set; }

        public double RideFair { get; set; }

        public int Seats { get; set; }
    }
}
