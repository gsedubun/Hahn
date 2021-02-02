import { Applicant } from "./applicant";
import { ApplicantService } from "./services/applicantservice";
import {inject} from 'aurelia-framework';

@inject(ApplicantService)
export class ApplicantList {

    applicants: Applicant[];
    constructor(service: ApplicantService){
        this.applicants = service.GetApplicants();
        console.log(this.applicants);
    }
    get isEmpty(){
        return this.applicants;
    }
}