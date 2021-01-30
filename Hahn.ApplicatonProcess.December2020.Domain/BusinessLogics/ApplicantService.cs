using Hahn.ApplicatonProcess.December2020.Data.Db;
using Hahn.ApplicatonProcess.December2020.Domain.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;

namespace Hahn.ApplicatonProcess.December2020.Domain.BusinessLogics
{
    public class ApplicantService
    {
        private readonly IDbContextFactory<HahnDbContext> Context;
        public ApplicantService(IDbContextFactory<HahnDbContext> contextFactory)
        {
            this.Context = contextFactory;
        }

        public Applicant Get(int applicantId)
        {
            using (var DbContext = Context.CreateDbContext())
            {

                var applicant = DbContext.ApplicantDatas.Find(applicantId);
                if (applicant != null)
                {
                    var model = new Applicant()
                    {
                        Address = applicant.Address,
                        Age = applicant.Age,
                        CountryOfOrigin = applicant.CountryOfOrigin,
                        EmailAddress = applicant.EmailAddress,
                        FamilyName = applicant.FamilyName,
                        Hired = applicant.Hired,
                        Name = applicant.Name, 
                        ID=applicant.ID
                    };
                    return model;
                }
                throw new Exception($"Applicant with id : {applicantId} not found.");
            }
        }

        public int Delete(int id)
        {
            using (var DbContext = Context.CreateDbContext())
            {
                var model =DbContext.ApplicantDatas.Find(id);
                if (model != null)
                {

                    DbContext.ApplicantDatas.Remove(model);
                    int res= DbContext.SaveChanges();
                    return res;
                }

                throw new Exception($"Applicant with id : {id} not found. Delete Failed.");
            }
        }

        public Applicant Update(int id, Applicant applicant)
        {
            using (var DbContext = Context.CreateDbContext())
            {
                var model = DbContext.ApplicantDatas.Find(id);
                if (model != null)
                {
                    model.Address=applicant.Address;
                    model.Age = applicant.Age;
                    model.CountryOfOrigin = applicant.CountryOfOrigin;
                    model.EmailAddress=applicant.EmailAddress;
                    model.FamilyName=applicant.FamilyName;
                    model.Hired=applicant.Hired;
                    model.Name=applicant.Name;

                    DbContext.ApplicantDatas.Update(model);
                    int res = DbContext.SaveChanges();
                    if(res>0)
                    {
                        applicant.ID=id;
                        return applicant;
                    }
                    throw new Exception($"Update Failed.");
                }

                throw new Exception($"Applicant with id : {id} not found. Update Failed.");
            }
        }

        public Applicant Create(Applicant applicant)
        {
            using (var DbContext = Context.CreateDbContext())
            {
                var model = new ApplicantData()
                {
                    Address = applicant.Address,
                    Age = applicant.Age,
                    CountryOfOrigin = applicant.CountryOfOrigin,
                    EmailAddress = applicant.EmailAddress,
                    FamilyName = applicant.FamilyName,
                    Hired = applicant.Hired,
                    Name = applicant.Name
                };
                DbContext.ApplicantDatas.Add(model);
                int res = DbContext.SaveChanges();
                if (res > 0)
                {
                    applicant.ID = model.ID;
                    return applicant;
                }
                throw new Exception("Insert applicant failed.");
            }
        }
    }
}
