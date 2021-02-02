import { Applicant, ApplicantService } from "services/applicantservice";
import {Router} from 'aurelia-router';

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
    
}