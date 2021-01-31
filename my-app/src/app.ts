import {PLATFORM, inject}  from  'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  public message = 'Applicants';
  router: Router;
  

  cofigureRouter(config: RouterConfiguration, router: Router){
    this.router = router;

    config.title="Applicants",
    // config.options.pushState=true,
    // config.options.root='',
    config.map([
      {route:'',              moduleId: PLATFORM.moduleName('./no-selection'), title:'Form'},
      {route:'applicant/:id', moduleId: PLATFORM.moduleName('./applicant-form'), title:'Detail'},
      {route:'not-found', moduleId: PLATFORM.moduleName('not-found')}
    ]);

    config.mapUnknownRoutes('not-found'); 
    config.fallbackRoute('not-found');
  }
  

}

