import {Component} from '@angular/core';
import {NgbxTabsetConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-tabset-config',
  templateUrl: './tabset-config.html',
  providers: [NgbxTabsetConfig] // add NgbxTabsetConfig to the component providers
})
export class NgbxdTabsetConfig {
  constructor(config: NgbxTabsetConfig) {
    // customize default values of tabsets used by this component tree
    config.justify = 'center';
    config.type = 'pills';
  }
}
