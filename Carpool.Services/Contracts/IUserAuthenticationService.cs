using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.DataModels;
using Models.ResponseModels;

namespace Carpool.Services
{
    public interface IUserAuthenticationService
    {

        bool CheckIsUnique(string username);

        UserDetails Authenticate(string name, string password);

        LastActionKeys GetLastActionIds(long userId);

    }
}
