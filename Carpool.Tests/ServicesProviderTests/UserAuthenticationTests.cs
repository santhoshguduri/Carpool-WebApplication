using Autofac.Extras.Moq;
using Carpool.Services;
using Carpool.Tests.SampleData;
using Models.DataModels;
using Models.ResponseModels;
using Moq;
using Repository;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Carpool.Tests.ServiceProvidersTests
{
    public class UserAuthenticationTests
    {
        SampleUserTestData UserTestingData = new SampleUserTestData();

       [Fact]
        public void Authenticate_ShouldWork()
        {
            List<User> SampleUsers = UserTestingData.GetSampleUsers();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<UserAuthenticationServices>();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.GetAll()).Returns(SampleUsers).Verifiable();

                UserDetails ActualUser = TestService.Authenticate("santhu","santhu");

                mock.Mock<IRepositoryManager<User>>().Verify(x => x.GetAll(), Times.Exactly(1));

                Assert.Equal(19, ActualUser.UserId);
            }
        }

        [Fact]
        public void GetLastActionIds_ShouldWork()
        {
            User SampleUser = UserTestingData.GetSampleUser();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<UserAuthenticationServices>();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Get(19)).Returns(SampleUser).Verifiable();

                LastActionKeys ActualKeys = TestService.GetLastActionIds(19);

                mock.Mock<IRepositoryManager<User>>().Verify(x => x.Get(19), Times.Exactly(1));

                Assert.Equal(15, ActualKeys.LastRideOfferedId);
            }
        }
    }
}
