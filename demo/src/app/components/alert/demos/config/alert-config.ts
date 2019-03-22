import {Component, Input} from '@angular/core';
import {NgbxAlertConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-alert-config',
  templateUrl: './alert-config.html',
  // add NgbxAlertConfig  to the component providers
  providers: [NgbxAlertConfig]
})
export class NgbxdAlertConfig {
  @Input() public alerts: Array<string> = [];

  constructor(alertConfig: NgbxAlertConfig) {
    // customize default values of alerts used by this component tree
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
  }
}
