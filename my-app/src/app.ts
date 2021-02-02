import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

const moduleIds = {
  'helloWorld': PLATFORM.moduleName('resources/hello-world/hello-world'),
  'about' : PLATFORM.moduleName('resources/about/about'),
  'form': PLATFORM.moduleName('resources/applicant-form/applicant-form'),
  'detail': PLATFORM.moduleName('resources/applicant-form/detail'),
  'edit': PLATFORM.moduleName('resources/applicant-form/edit'),
  'home': PLATFORM.moduleName('resources/home/home'),
}

export class App {
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    
    config.title = 'Applicant';
    config.options.root= '/';
    config.options.pushState = true;
    config.map([
      { route: ['','home'],name:'home', moduleId: moduleIds.home, title: 'Home' },
      { route: 'about', moduleId: moduleIds.about, title: 'About' },
      { route: 'applicant/create', moduleId: moduleIds.form, title: 'Create' },
      { route: 'applicant/edit/:id', moduleId: moduleIds.edit, title: 'Edit' },
      { route: 'applicant/:id', moduleId: moduleIds.detail, title: 'Detail' }
    ]);


  }
}
