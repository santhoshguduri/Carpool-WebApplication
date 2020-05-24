using Autofac.Extras.Moq;
using Carpool.Services;
using Carpool.Tests.SampleData;
using Models.DataModels;
using Moq;
using Repository;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Carpool.Tests.ServiceProvidersTests
{
    public class CarManagementServicesTests
    {
        SampleCarTestData CarTestingData = new SampleCarTestData();

        [Fact]
        public void CreateCar_ShouldWork()
        {
            Car SampleCar = CarTestingData.GetSampleCar();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<CarServices>();

                mock.Mock<IRepositoryManager<Car>>().Setup(x => x.Post(SampleCar)).Verifiable();

                TestService.CreateCar(SampleCar);

                mock.Mock<IRepositoryManager<Car>>().Verify(x => x.Post(SampleCar), Times.Exactly(1));
            }
        }

        [Fact]
        public void CheckIfOwnsCar_ShouldWork()
        {
            List<Car> SampleCars = CarTestingData.GetSampleCars();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<CarServices>();

                mock.Mock<IRepositoryManager<Car>>().Setup(x => x.GetAll()).Returns(SampleCars).Verifiable();

                long ActualCarId = TestService.CheckIfOwnsCar(19);

                mock.Mock<IRepositoryManager<Car>>().Verify(x => x.GetAll(), Times.Exactly(2));

                Assert.Equal(2, ActualCarId);
            }
        }
    }
}
