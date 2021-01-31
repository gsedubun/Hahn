import {Applicant} from './applicant';

export class ApplicantForm{
    applicant: Applicant;
    formIsValid: boolean = true;

    addApplicant(){
        console.log(this.applicant);
      }
}