using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Models.DataModels;
using Repository;

namespace Carpool.Services
{
    public class CarServices : ICarServices
    {
        private readonly IRepositoryManager<Car> _repository;

        public CarServices(IRepositoryManager<Car> repository)
        {
            _repository = repository;
        }

        public void CreateCar(Car car)
        {
            _repository.Post(car);
        }

        public void DeleteCar(long id)
        {
            _repository.Delete(id);
        }

        public long CheckIfOwnsCar(long id)
        {
            return _repository.GetAll().ToList().Exists(e => e.CarOwnerId == id)? _repository.GetAll().ToList().First(e=>e.CarOwnerId == id).CarId:0;
        }
    }
}
