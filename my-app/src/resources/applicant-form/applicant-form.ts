import {Applicant , ApplicantService} from '../../services/applicantservice';
import {inject} from 'aurelia-framework';
import {  Router } from 'aurelia-router';


@inject(ApplicantService, Router)
export class ApplicantForm {
    applicant: Applicant;
    formIsValid: boolean = true;
  constructor(private api: ApplicantService, private router: Router, private isNew: boolean){
     if(!isNew){
       router.
       api.Get()
     }
  }
    addApplicant(){
        console.log(this.applicant);
        this.api.Create(this.applicant).then(d=>{
          if(d.statusCode>=200 && d.statusCode<=400)
          {
            console.log('das');
            this.api.GetApplicants();
            this.router.navigate('home');
          }
          else{
            console.error('failed');
            alert(d.response);
          }
        });
      }
}