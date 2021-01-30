
export class App {
  public message = 'Hello World!';
  applicant: Applicant;
  formIsValid: boolean = true;
  
  addApplicant(){
    console.log(this.applicant);
  }

}

interface Applicant{
  name: string;
  familyName: string;
  address : string;
  countryOfOrigin: string;
  emailAddress : string;
  age:number;
  hired: boolean;
}
