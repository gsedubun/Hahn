import { Applicant, ApplicantService } from "services/applicantservice";
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(ApplicantService, Router)
export class ApplicantEdit {
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
            console.log(d.content);
        });
        console.log('get-applicant '+params.id);
    }
    
    Save(){
        this.api.Edit(this.applicant.id, this.applicant).then(d=> {
            console.log(d);
            if(d.statusCode>=200){
                this.router.navigate('applicant/'+this.applicant.id);
            }
            else{
                alert(d.response);
            }
        });
        console.log('delete');
    }
    
}