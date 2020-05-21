using Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Tests.SampleData
{
    internal class SampleCarTestData
    {
        public Car GetSampleCar()
        {
            Car TestCar = new Car()
            {
                CarId = 2,
                CarOwnerId = 19,
                Name = "Audi",
                SeatCapacity = 2,
                TypeName = CarTypes.Convertible
            };
            return TestCar;
        }

        public List<Car> GetSampleCars()
        {
            List<Car> Cars = new List<Car>()
            {
                new Car
                {
                    CarId = 2,
                    CarOwnerId = 19,
                    Name = "Audi",
                    SeatCapacity = 2,
                    TypeName = CarTypes.Convertible
                },
                new Car
                {
                    CarId = 3,
                    CarOwnerId = 20,
                    Name = "Jaguar",
                    SeatCapacity = 3,
                    TypeName = CarTypes.Crossover
                }
            };
            return Cars;
        }
    }
}
