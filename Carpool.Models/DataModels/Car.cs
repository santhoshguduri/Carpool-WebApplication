using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DataModels
{
    public enum CarTypes { Hatchback = 1, Sedan, SUV, Crossover, Convertible }

    public class Car
    {
        [Key]
        public long CarId { get; set; }

        public string Name { get; set; }

        public long SeatCapacity { get; set; }

        public long CarOwnerId { get; set; }

        public CarTypes TypeName { get; set; }
    }

}


