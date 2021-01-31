import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

const moduleIds = {
  'helloWorld': PLATFORM.moduleName('resources/hello-world/hello-world'),
  'about' : PLATFORM.moduleName('resources/about/about'),
  'form': PLATFORM.moduleName('resources/applicant-form/applicant-form'),
  'home': PLATFORM.moduleName('resources/home/home'),
}

export class App {
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Bootstrap Skeleton';
    config.options.root= '/';
    config.options.pushState = true;
    config.map([
      { route: ['','hello'], moduleId: moduleIds.home, title: 'Home' },
      { route: 'about', moduleId: moduleIds.about, title: 'About' },
      { route: 'applicant/:id', moduleId: moduleIds.form, title: 'Detail' }
    ]);

    this.router = router;

  }
}
