using Microsoft.EntityFrameworkCore;
using System;

namespace Hahn.ApplicatonProcess.December2020.Data.Db

{
    public class HahnDbContext : DbContext
    {
        public HahnDbContext(DbContextOptions<HahnDbContext> options)
          : base(options)
        {
        }
        public DbSet<ApplicantData> ApplicantDatas { get;set;}
    }


    public class ApplicantData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string FamilyName { get; set; }

        public string Address { get; set; }

        public string CountryOfOrigin { get; set; }

        public string EmailAddress { get; set; }

        public int Age { get; set; }
        public bool Hired { get; set; }

      

    }
}
