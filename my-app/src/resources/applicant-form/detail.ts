import { Applicant, ApplicantService } from "services/applicantservice";
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(ApplicantService, Router)
export class ApplicantDetail {
    routeConfig;
    applicant: Applicant;
    formIsValid: boolean = true;
  constructor(private api: ApplicantService, private router: Router, private isNew: boolean){
     if(!isNew){
       
     }
  }

  activate(params, routeConfig){
    this.routeConfig = routeConfig;
    this.api.Get(params.id).then(d=> {
        this.applicant= d.content;
    });
    console.log('get-applicant '+params.id);
  }
  Delete(){
      this.api.Delete(this.applicant.id).then(d=> {
          console.log(d);
          if(d.statusCode>=200){
              this.api.GetApplicants();
            this.router.navigate('home');
          }
          else{
              alert(d.response);
          }
      });
      console.log('delete');
  }
    
}