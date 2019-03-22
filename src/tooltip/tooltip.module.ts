import {NgModule, ModuleWithProviders} from '@angular/core';

import {NgbxTooltip, NgbxTooltipWindow} from './tooltip';

export {NgbxTooltipConfig} from './tooltip-config';
export {NgbxTooltip} from './tooltip';
export {Placement} from '../util/positioning';

@NgModule(
    {declarations: [NgbxTooltip, NgbxTooltipWindow], exports: [NgbxTooltip], entryComponents: [NgbxTooltipWindow]})
export class NgbxTooltipModule {
  /**
   * No need in forRoot anymore with tree-shakeable services
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxTooltipModule}; }
}
