import {FrameworkConfiguration} from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./hello-world/hello-world'),
    PLATFORM.moduleName('./about/about'),
    PLATFORM.moduleName('./applicant-form/applicant-form'),
    PLATFORM.moduleName('./applicant-list/applicant-list'),
    PLATFORM.moduleName('resources/home/home'),
  ]);
}
