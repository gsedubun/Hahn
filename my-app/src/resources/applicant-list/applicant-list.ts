import { ApplicantService,Applicant } from "../../services/applicantservice";
import {inject} from 'aurelia-framework';

@inject(ApplicantService)
export class ApplicantList {
    api : ApplicantService;
    //applicants: Applicant[];
    constructor(service: ApplicantService){
        this.api=service;
    }
    get isEmpty(){
        return this.api.data;
    }

    get applicants(): Applicant[]{ return this.api.data;}
}