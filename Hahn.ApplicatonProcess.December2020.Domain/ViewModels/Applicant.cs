using System;
using System.ComponentModel.DataAnnotations;

namespace Hahn.ApplicatonProcess.December2020.Domain.ViewModels
{
    public class Applicant
    {
        public int ID { get; set; }
        /// <summary>
        /// Applicant's name.
        /// </summary>
        /// <example>Denzel</example>
        public string Name { get; set; }
        /// <summary>
        /// Applicant's family name.
        /// </summary>
        /// <example>Washington</example>
        public string FamilyName { get; set; }

        /// <summary>
        /// Applicant's address.
        /// </summary>
        /// <example>New York</example>
        public string Address { get; set; }
        /// <summary>
        /// Country of origin.
        /// </summary>
        /// <example>United States</example>
        public string CountryOfOrigin { get; set; }

        /// <summary>
        /// Email address.
        /// </summary>
        /// <example>denzel@yahoo.com</example>
        [EmailAddress]
        public string EmailAddress { get; set; }
        /// <summary>
        /// Applicant's age.
        /// </summary>
        /// <example>55</example>
        public int Age { get;set;}

        /// <summary>
        /// Hired or not.
        /// </summary>
        /// <example>false</example>
        public bool Hired { get;set;} = false;

//        ID(int )
//Name(string )
//FamilyName(string )
//Address(string )
//CountryOfOrigin(string )
//EMailAdress(string )
//Age(int)
//Hired(bool) – false if not provided.

    }

}
