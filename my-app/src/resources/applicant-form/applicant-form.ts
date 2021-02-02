import {Applicant , ApplicantService, BootstrapFormRenderer} from '../../services/applicantservice';
import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ValidationController, ValidationControllerFactory, ValidationRules} from 'aurelia-validation';

@inject(ApplicantService, Router ,ValidationController, ValidationControllerFactory)
export class ApplicantForm {
  name:string;
  familyName:string;
  address:string;
  emailAddress: string;
  countryOfOrigin:string;
  age:number;
  hired:boolean;

  @bindable
  validationController : ValidationController;
  
  
  formIsValid: boolean = true;

  public constructor(private api: ApplicantService, private router: Router, private isNew: boolean,
    private validation: ValidationControllerFactory){
  
    this.validationController = validation.createForCurrentScope();
    
  this.validationController.addRenderer(new BootstrapFormRenderer());

  }
    addApplicant(){
      
      this.validationController.validate()
      .then(res=>{
        if(res.valid){
          console.log(res);
          this.api.Create(Applicant.create({
            name: this.name,
            familyName : this.familyName,
            address: this.address,
            emailAddress: this.emailAddress,
            countryOfOrigin: this.countryOfOrigin,
            age: this.age,
            hired: this.hired
          })).then(d=>{
            if(d.statusCode>=200 && d.statusCode<=400)
            {
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
          console.log('error');
          console.log(res.instruction);
         
        }
      })

      }
}

ValidationRules.customRule(
  'countries',
  (value, obj, otherPropertyName) =>
  ApplicantService.GetCountry(value),
  '${$displayName} must match  https://restcountries.eu/rest/v2.',
   otherPropertyName => ({ otherPropertyName })
);
ValidationRules.customRule('email',
(value,obj, otherPropertyName)=>
ApplicantService.ValidateEmail(value),
'${$displayName} must include top level domain.',
   otherPropertyName => ({ otherPropertyName })
);

ValidationRules
  .ensure((a: ApplicantForm)=> a.name).required().minLength(5)
  .ensure((a: ApplicantForm)=> a.familyName).required().minLength(5)
  .ensure((a: ApplicantForm)=> a.address).required().minLength(10)
  .ensure((a: ApplicantForm)=> a.countryOfOrigin).required().satisfiesRule('countries')
  .ensure((a: ApplicantForm)=> a.emailAddress).required()
  .ensure((a: ApplicantForm)=> a.emailAddress).satisfiesRule('email')
  .ensure((a: ApplicantForm)=> a.age).required().min(20).max(60)
  .on(ApplicantForm);