using Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Services
{
    public interface ICarServices
    {

        void CreateCar(Car car);

        void DeleteCar(long id);

        long CheckIfOwnsCar(long id);
    }
}
