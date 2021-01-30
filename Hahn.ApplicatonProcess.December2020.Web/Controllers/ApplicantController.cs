using Hahn.ApplicatonProcess.December2020.Domain.BusinessLogics;
using Hahn.ApplicatonProcess.December2020.Domain.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Serilog;
using System.Linq;
using System.Net;

namespace Hahn.ApplicatonProcess.December2020.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicantController : ControllerBase
    {
        private ApplicantService applicantService;
        private ILogger Logger;
        public ApplicantController(ApplicantService applicantService, ILogger logger)
        {
            this.applicantService = applicantService; Logger = logger;

        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                int model = applicantService.Delete(id);
                if (model > 0)
                    return Ok();

                return BadRequest("0 rows deleted.");
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex.Message, ex);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Update(int id, [FromBody] Applicant applicant)
        {
            var valiEmail = RegexUtilities.IsValidEmail(applicant.EmailAddress);
            if (!valiEmail)
            {
                return BadRequest("Invalid email address");
            }
            if (ModelState.IsValid)
            {
                try
                {
                    Applicant model = applicantService.Update(id, applicant);
                    return Ok(model);
                }
                catch (System.Exception ex)
                {
                    Logger.Error(ex.Message, ex);
                    return StatusCode(500, ex.Message);
                }
            }
            return BadRequest(applicant);
        }


        [HttpGet]
        public IActionResult Get(int id)
        {
            try
            {
                var model = applicantService.Get(id);
                return Ok(model);
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex.Message, ex);
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost]
        public IActionResult Create(Applicant applicant)
        {
            var valiEmail = RegexUtilities.IsValidEmail(applicant.EmailAddress);
            if (!valiEmail)
            {
                return BadRequest("Invalid email address");
            }
            if (ModelState.IsValid)
            {

                try
                {
                    var model = applicantService.Create(applicant);

                    return StatusCode(201, new { url = Url.Action(nameof(Get), new { id = model.ID }) });
                }
                catch (System.Exception ex)
                {
                    Logger.Error(ex.Message, ex);
                    return StatusCode(500, ex.Message);

                }


            }
            return BadRequest(applicant);
        }
    }


}
