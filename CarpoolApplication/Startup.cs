using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using DataProvider.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Carpool.Services;
using Repository;
using Models.DataModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AutoMapper;
using CarpoolApplication.MappingProfiles;

namespace CarpoolApplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string AllowSpecificOrigins = "_allowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddScoped<IBookingService, BookingService>();
            services.AddScoped<ICarServices, CarServices>();
            services.AddScoped<IUserAuthenticationService, UserAuthenticationServices>();
            services.AddScoped<IAccountManagementServices, AccountManagementServices>();
            services.AddScoped<IOfferRideService, OfferRideService>();
            services.AddScoped<IRepositoryManager<User>, RepositoryManager<User>>();
            services.AddScoped<IRepositoryManager<Place>, RepositoryManager<Place>>();
            services.AddScoped<IRepositoryManager<Booking>, RepositoryManager<Booking>>();
            services.AddScoped<IRepositoryManager<Car>, RepositoryManager<Car>>();
            services.AddScoped<IRepositoryManager<OfferRide>, RepositoryManager<OfferRide>>();

            services.AddAutoMapper(typeof(MappingProfile));

            services.AddDbContext<CarpoolDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("CarpoolDBContext")));
            services.AddCors(options =>
                options.AddPolicy(AllowSpecificOrigins, builder =>
                {
                    builder.WithOrigins("https://localhost:44320")
                    .AllowAnyHeader()
                    .AllowAnyMethod();

                }));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF32.GetBytes("c2FudGhvc2g="))
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(AllowSpecificOrigins);

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
