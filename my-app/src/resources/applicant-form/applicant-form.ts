import {Applicant , ApplicantService} from '../../services/applicantservice';
import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {validateTrigger, ValidationController, ValidationControllerFactory, ValidationRules} from 'aurelia-validation';
import {IValidationRules} from '@aurelia/validation';  

@inject(ApplicantService, Router, ValidationControllerFactory)
export class ApplicantForm {

  validationController : ValidationController;
  
  @bindable
  applicant: Applicant;
  
  formIsValid: boolean = true;
  public constructor(private api: ApplicantService, private router: Router, private isNew: boolean,
    private validation: ValidationControllerFactory){
    //this.controller = validation.;//.createForCurrentScope();
    //console.log(this.validation);
    //this.controller.validateTrigger = validateTrigger.manual;
    this.validationController = validation.createForCurrentScope();
    
    
  ValidationRules
  .ensure('name').required().minLength(5)
  .ensure('familyName').required().minLength(5)
  .ensure('address').required().minLength(10)
  .ensure('countryOfOrigin').required().satisfies(d=> ApplicantService.GetCountry(d.value))
  .ensure('emailAddress').required()
  .ensure('age').required().min(20).max(60)
  .on(Applicant);
  }
    addApplicant(){
      this.validationController.validate()
      .then(res=>{
        if(res.valid){
          this.api.Create(this.applicant).then(d=>{
            if(d.statusCode>=200 && d.statusCode<=400)
            {
              console.log('das');
              this.api.GetApplicants();
              this.router.navigate('home');
            }
            else{
              console.error('failed');
              alert(d);
            }
          }).catch(d=>{
            if(d.response)
            {
              alert(d.response);
              console.log(d.response);
            }
            else{
              console.log(d);
              alert(d)
            }
          });
        }
        else{
          console.log(res);
          alert(res.results);
        }
      })

      }
}