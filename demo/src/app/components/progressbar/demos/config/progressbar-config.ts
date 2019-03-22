import {Component} from '@angular/core';
import {NgbxProgressbarConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-progressbar-config',
  templateUrl: './progressbar-config.html',
  providers: [NgbxProgressbarConfig] // add the NgbxProgressbarConfig to the component providers
})
export class NgbxdProgressbarConfig {
  constructor(config: NgbxProgressbarConfig) {
    // customize default values of progress bars used by this component tree
    config.max = 1000;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }
}
