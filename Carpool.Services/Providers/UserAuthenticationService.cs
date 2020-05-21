using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Models.DataModels;
using Models.ResponseModels;
using Repository;

namespace Carpool.Services
{
    public class UserAuthenticationServices : IUserAuthenticationService
    {
        private static string Secret = "c2FudGhvc2g=";

        private readonly IRepositoryManager<User> _repository;

        public UserAuthenticationServices(IRepositoryManager<User> repository)
        {
            _repository = repository;
        }


        public bool CheckIsUnique(string username)
        {
            return _repository.GetAll().FirstOrDefault(a => a.Username == username) != null ? true : false;
        }

        public UserDetails Authenticate(string userName, string password)
        {
            User user = _repository.GetAll().FirstOrDefault(a => a.Username == userName && a.Password == password);
            if (user != null)
            {
                UserDetails response = new UserDetails()
                {
                    UserId = user.Id,
                    Name = user.Name,
                    Token = GenerateToken(userName)
                };
                return response;
            }
            else { return null; }
        }

        public LastActionKeys GetLastActionIds(long userId)
        {
            User User = _repository.Get(userId);
            LastActionKeys LastActionKeys = new LastActionKeys()
            {
                LastBookingId = User.LastBookingId,
                LastRideOfferedId = User.LastOfferRideId
            };
            return LastActionKeys;
        }

        public static string GenerateToken(string userName)
        {

            byte[] Key = Encoding.UTF32.GetBytes(Secret);
            SymmetricSecurityKey SecurityKey = new SymmetricSecurityKey(Key);
            SecurityTokenDescriptor Descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, userName) }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256Signature)
            };
            JwtSecurityTokenHandler Handler = new JwtSecurityTokenHandler();
            JwtSecurityToken Token = Handler.CreateJwtSecurityToken(Descriptor);
            return Handler.WriteToken(Token);
        }
    }
}
