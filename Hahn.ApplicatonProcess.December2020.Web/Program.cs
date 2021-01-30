using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.December2020.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {

            Log.Logger = new LoggerConfiguration()
            // `LogEventLevel` requires `using Serilog.Events;`
            .Enrich.FromLogContext()
            .CreateLogger();
            try
            {
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {

                Log.Fatal(ex, "Application failed to run.");

            }
            finally
            {
                Log.CloseAndFlush();
            }

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
              .UseSerilog((hostingcontext, loggerconfig) =>
                    loggerconfig.ReadFrom.Configuration(hostingcontext.Configuration))
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureLogging(d =>
                    {
                        d.AddFilter("Microsoft", LogLevel.Information);
                        d.AddFilter("System", LogLevel.Error);
                    })
                    .UseStartup<Startup>();
                });
    }
}
