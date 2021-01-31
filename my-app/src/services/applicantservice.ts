import { Applicant } from "../applicant";

import $ from 'jquery';
import { HttpClient } from "aurelia-http-client";
import {AppConfig} from "../AppConfig";


export class ApplicantService{

    GetApplicants(): Applicant[]{
        let http = new HttpClient();
        var data :Applicant[];
         http.get(AppConfig.baseurl + '/applicant/getall')
        .then((response)=>{
            if(response.isSuccess){
                console.log(response.content);

                data=response.content;

            }
        });
return data;
    }
}