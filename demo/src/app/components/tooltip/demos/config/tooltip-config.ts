import {Component} from '@angular/core';
import {NgbxTooltipConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-tooltip-config',
  templateUrl: './tooltip-config.html',
  providers: [NgbxTooltipConfig] // add NgbxTooltipConfig to the component providers
})
export class NgbxdTooltipConfig {
  constructor(config: NgbxTooltipConfig) {
    // customize default values of tooltips used by this component tree
    config.placement = 'right';
    config.triggers = 'click';
  }
}
