using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataProvider.Data;

namespace Repository
{
    public interface IRepositoryManager<T> where T:class
    {
        IEnumerable<T> GetAll();


        T Get(long id);


        void Put(T entity);


        void Post(T entity);


        void Delete(long id);

        void AddRange(List<T> entityList);

    }
}
