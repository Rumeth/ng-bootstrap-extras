import {Component} from '@angular/core';
import {NgbxPopoverConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-popover-config',
  templateUrl: './popover-config.html',
  providers: [NgbxPopoverConfig] // add NgbxPopoverConfig to the component providers
})
export class NgbxdPopoverConfig {
  constructor(config: NgbxPopoverConfig) {
    // customize default values of popovers used by this component tree
    config.placement = 'right';
    config.triggers = 'hover';
  }
}
