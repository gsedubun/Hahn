import { Applicant, ApplicantService, BootstrapFormRenderer } from "services/applicantservice";
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory, ValidationRules } from "aurelia-validation";

@inject(ApplicantService, Router, ValidationController,ValidationControllerFactory)
export class ApplicantEdit {
    routeConfig;
    // applicant: Applicant;
    formIsValid: boolean = true;
    id: number;
    name:string;
    familyName:string;
    address:string;
    emailAddress: string;
    countryOfOrigin:string;
    age:number;
    hired:boolean;

    controller : ValidationController;
    constructor(private api: ApplicantService, private router: Router, private isNew: boolean, 
        private val: ValidationControllerFactory){
            this.controller = val.createForCurrentScope();
            this.controller.addRenderer(new BootstrapFormRenderer());
    }

    activate(params, routeConfig){
        this.routeConfig = routeConfig;
        this.api.Get(params.id).then(d=> {
            this.name= d.content.name;
            this.familyName= d.content.familyName;
            this.address= d.content.address;
            this.emailAddress= d.content.emailAddress;
            this.countryOfOrigin= d.content.countryOfOrigin;
            this.age= d.content.age;
            this.hired= d.content.hired;
            this.id = d.content.id;
            console.log(d.content);
        });
    }
    
    Save(){
        this.controller.validate()
            .then(res=>{
                if(res.valid){
                    const applicant = Applicant.create({
                        name: this.name,
                        familyName : this.familyName,
                        address: this.address,
                        emailAddress: this.emailAddress,
                        countryOfOrigin: this.countryOfOrigin,
                        age: this.age,
                        hired: this.hired
                      });
                    this.api.Edit(this.id, applicant).then(d=> {
                        console.log(d);
                        if(d.statusCode>=200){
                            this.router.navigate('applicant/'+this.id);
                        }
                        else{
                            alert(d.response);
                        }
                    });
                    console.log('delete');
                }
                else{
                    console.log('error');
                    console.log(res);
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

  
ValidationRules.customRule(
    'email',
    (value, obj, otherPropertyName) =>
    ApplicantService.ValidateEmail(value),
    '${$displayName} must valid email.',
     otherPropertyName => ({ otherPropertyName })
  );
  
ValidationRules
  .ensure((a: ApplicantEdit)=> a.name).required().minLength(5)
  .ensure((a: ApplicantEdit)=> a.familyName).required().minLength(5)
  .ensure((a: ApplicantEdit)=> a.address).required().minLength(10)
  .ensure((a: ApplicantEdit)=> a.countryOfOrigin).required().satisfiesRule('countries')
  .ensure((a: ApplicantEdit)=> a.emailAddress).required()
  .ensure((a: ApplicantEdit)=> a.emailAddress).satisfiesRule('email')
  .ensure((a: ApplicantEdit)=> a.age).required().min(20).max(60)
  .on(ApplicantEdit);