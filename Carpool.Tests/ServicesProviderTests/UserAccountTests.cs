using Autofac.Extras.Moq;
using AutoMapper;
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
    public class UserAccountTests
    {
        SampleUserTestData UserTestingData = new SampleUserTestData();

        [Fact]
        public void CreateNewUser_ShouldWork()
        {
            User SampleUser = UserTestingData.GetSampleUser();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<AccountManagementServices>();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Post(SampleUser)).Verifiable();

                TestService.CreateNewUser(SampleUser);

                mock.Mock<IRepositoryManager<User>>().Verify(x => x.Post(SampleUser), Times.Exactly(1));
            }
        }

        [Fact]
        public void UpdateUser_ShouldWork()
        {
            User SampleUser = UserTestingData.GetSampleUser();

            using (var mock = AutoMock.GetStrict())
            {
                var TestService = mock.Create<AccountManagementServices>();

                mock.Mock<IRepositoryManager<User>>().Setup(x => x.Put(SampleUser)).Verifiable();

                TestService.UpdateUser(SampleUser);

                mock.Mock<IRepositoryManager<User>>().Verify(x => x.Put(SampleUser), Times.Exactly(1));
            }
        }
    }
}
