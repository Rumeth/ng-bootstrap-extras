import {Component} from '@angular/core';
import {NgbxTimepickerConfig} from 'ng-bootstrap-extras';
import {NgbxTimeStruct} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-timepicker-config',
  templateUrl: './timepicker-config.html',
  providers: [NgbxTimepickerConfig] // add NgbxTimepickerConfig to the component providers
})
export class NgbxdTimepickerConfig {
  time: NgbxTimeStruct = {hour: 13, minute: 30, second: 0};

  constructor(config: NgbxTimepickerConfig) {
    // customize default values of ratings used by this component tree
    config.seconds = true;
    config.spinners = false;
  }
}
