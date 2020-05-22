using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models.DataModels
{
    public class Place
    {
        [Key]
        public long AreaId { get; set; }
        public string AreaName { get; set; }
        public long RideOfferId { get; set; }
    }
}
