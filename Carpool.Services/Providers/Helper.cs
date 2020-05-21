using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Services
{
    public class Helper 
    {
        private long UniqueId = 0;
        public long GenerateId()
        {
            return UniqueId++;
        }
    }
}
