import { HttpClient, HttpResponseMessage } from "aurelia-http-client";


export class ApplicantService{
    http : HttpClient;
     constructor(public data: Applicant[]){
            this.http = new HttpClient();
         this.GetApplicants();
    }
    async Create(data: Applicant)  {
       return this.http.post(AppConfig.baseurl+'/applicant', data)
            .then((resp)=> resp);
    }
    async GetApplicants() {
         this.http.get(AppConfig.baseurl + '/applicant/getall')
        .then((response)=>{
            if(response.isSuccess){
                this.data=response.content;

            }
        });

    }
}
export class AppConfig {

    public static baseurl="https://localhost:5001";
  }
  export class Applicant {
    constructor(
   public name: string,
   public familyName: string,
   public address: string,
   public countryOfOrigin: string,
   public emailAddress: string,
   public age: number,
   public hired: boolean
    ){
      
    }
  
    static create(obj: any){
      return new Applicant(obj.name, obj.familyName, obj.address, obj.countryOfOrigin, obj.emailAddress, obj.age, obj.hired);
    }
  }
  