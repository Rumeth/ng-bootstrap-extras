import {Component} from '@angular/core';
import {NgbxAccordionConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-accordion-config',
  templateUrl: './accordion-config.html',
  providers: [NgbxAccordionConfig] // add the NgbxAccordionConfig to the component providers
})
export class NgbxdAccordionConfig {
  constructor(config: NgbxAccordionConfig) {
    // customize default values of accordions used by this component tree
    config.closeOthers = true;
    config.type = 'info';
  }
}
