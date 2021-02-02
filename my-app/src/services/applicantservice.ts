import { HttpClient, HttpResponseMessage, responseTypeTransformer } from "aurelia-http-client";
import {RenderInstruction, ValidationRules, ValidateResult } from "aurelia-validation";
import { Primitive } from "lodash";


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
    static GetCountry(name: string): Promise<boolean>{
      console.log("validate ==>"+name);
      let ht = new HttpClient();
      return ht.get(this.countriesUrl+'name/'+name+'?fullText=true')
        .then((response)=> response.isSuccess).catch(r=> false);
    }

    static ValidateEmail(email: string) {
//       const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// return re.test(String(email).toLowerCase())
        console.log('VALIDATE EMAIL');
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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
//      }
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


// import {
//   ValidationRenderer,
//   RenderInstruction,
//   ValidateResult
// } from 'aurelia-validation';

export class BootstrapFormRenderer {
  render(instruction: RenderInstruction) {
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  add(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    // add the has-error class to the enclosing form-group div
    formGroup.classList.add('has-error');

    // add help-block
    const message = document.createElement('span');
    message.className = 'help-block validation-message';
    message.textContent = result.message;
    message.id = `validation-message-${result.id}`;
    formGroup.appendChild(message);
  }

  remove(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    // remove help-block
    const message = formGroup.querySelector(`#validation-message-${result.id}`);
    if (message) {
      formGroup.removeChild(message);

      // remove the has-error class from the enclosing form-group div
      if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
        formGroup.classList.remove('has-error');
      }
    }
  }
}