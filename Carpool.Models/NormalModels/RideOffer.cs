using System;
using System.Collections.Generic;
using System.Text;

namespace Models.RequestModels
{
    public class RideOffer
    {
        public List<string> NormalRoute { get; set; }

        public int AvailableSeats { get; set; }

        public DateTime RideOfferedDate { get; set; }

        public long CarId { get; set; }

        public string Time { get; set; }
    }
}
