import { HttpClient, HttpResponseMessage, responseTypeTransformer } from "aurelia-http-client";
import {RenderInstruction, ValidationRules } from "aurelia-validation";


export class ApplicantService{
    static countriesUrl : string="https://restcountries.eu/rest/v2/";
    http : HttpClient;
     constructor(public data: Applicant[]){
            this.http = new HttpClient();
         this.GetApplicants();
    }
    Get(id){
      return this.http.get(AppConfig.baseurl+'/applicant?id='+id)
        .then((resp)=> resp);
    }

    Edit(id : number, data: Applicant){
      
      return this.http.put(AppConfig.baseurl+'/applicant?id='+id, data)
      .then((resp)=> resp);
    }

    Delete(id : number){
      return this.http.delete(AppConfig.baseurl+'/applicant?id='+id)
      .then((resp)=> resp);
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
    static GetCountry(name: string){
      console.log("validate ==>"+name);
      let ht = new HttpClient();
      return ht.get(this.countriesUrl+'name/'+name+'?fullText=true')
        .then((response)=> response.isSuccess);
    }
}
export class AppConfig {

    public static baseurl="https://localhost:5001";
  }

  export class Applicant {
    constructor(
      public id: number,
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
      return new Applicant(obj.id, obj.name, obj.familyName, obj.address, obj.countryOfOrigin, obj.emailAddress, obj.age, obj.hired);
    }
//     static getRules() : any{
// return 
// ValidationRules
// .ensure('name').required().minLength(5)
// .ensure('familyName').required().minLength(5)
// .ensure('address').required().minLength(10)
// .ensure('countryOfOrigin').required().satisfies(d=> ApplicantService.GetCountry(d.value))
// .ensure('emailAddress').required()
// .ensure('age').required().min(20).max(60).on(Applicant);

//     }
  }
  


export class SimpleValidationRenderer {

  public render(instruction: RenderInstruction) {
    for (let { elements} of instruction.unrender) {
      elements.forEach(target => target.parentElement.querySelector(".error").textContent = "");
    }

    for (let {result, elements} of instruction.render) {
      elements.forEach(target => target.parentElement.querySelector(".error").textContent = result.message);
    }
  }
}
