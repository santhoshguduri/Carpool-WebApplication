using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataProvider.Data;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class RepositoryManager<T> : IRepositoryManager<T> where T : class
    {
        private readonly CarpoolDBContext _context;

        public RepositoryManager(CarpoolDBContext context)
        {
            _context = context;
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }

        public T Get(long id)
        {
            return _context.Set<T>().Find(id);
        }


        public void Put(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }


        public async void Post(T entity)
        {
            await _context.AddAsync(entity);
            _context.SaveChanges();
            
        }


        public async void Delete(long id)
        {
            T data = await _context.Set<T>().FindAsync(id);
            
            _context.Remove(data);
            await _context.SaveChangesAsync();
        }

        public async void AddRange(List<T> entityList)
        {
            await _context.AddRangeAsync(entityList);
        }

    }
}
