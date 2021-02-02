import {Aurelia} from 'aurelia-framework'
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';

// import jQuery as a global dependency
import 'jquery';

// import boostrap js as a global dependency
import 'bootstrap/dist/js/bootstrap.bundle';

// import bootstap css as a global dependency
import 'bootstrap/dist/css/bootstrap.css';

import 'app.css';


export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-validation'));
  
    // aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'));
  
    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
