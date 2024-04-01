using Microsoft.AspNetCore.Mvc;
using System.Threading;

namespace ReactApp2.Server.Controllers
{

    public class UserModel
    {
         public UserModel() { }
        public int Id { get; set; } 
        public string Name { get; set; }    
        public DateTime BirthDate { get; set; }
    }
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async IAsyncEnumerable<int> Get()
        {
            var data = Enumerable.Range(1, 100).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
               .ToArray();
            foreach (var item in data)
            {
                await Task.Delay(1000);
                yield return item.TemperatureC;
            }
        }

        [HttpGet("testasync")]
        public async IAsyncEnumerable<UserModel> GetValues()
        {
            var values = new[] { "Okan", "Jack", "Banu", "Ronaldo" };
            var counter = 0;
            foreach (var item in values)
            {
                await Task.Delay(1000);
                yield return new UserModel { Id = ++counter, Name = item, BirthDate = DateTime.Now };
            }
        }
    }
}
