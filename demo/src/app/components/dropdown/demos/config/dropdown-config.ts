import {Component} from '@angular/core';
import {NgbxDropdownConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-dropdown-config',
  templateUrl: './dropdown-config.html',
  providers: [NgbxDropdownConfig] // add NgbxDropdownConfig to the component providers
})
export class NgbxdDropdownConfig {
  constructor(config: NgbxDropdownConfig) {
    // customize default values of dropdowns used by this component tree
    config.placement = 'top-left';
    config.autoClose = false;
  }
}
