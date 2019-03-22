import {NgModule, ModuleWithProviders} from '@angular/core';

import {NgbxPopover, NgbxPopoverWindow} from './popover';
import {CommonModule} from '@angular/common';

export {NgbxPopover} from './popover';
export {NgbxPopoverConfig} from './popover-config';
export {Placement} from '../util/positioning';

@NgModule({
  declarations: [NgbxPopover, NgbxPopoverWindow],
  exports: [NgbxPopover],
  imports: [CommonModule],
  entryComponents: [NgbxPopoverWindow]
})
export class NgbxPopoverModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxPopoverModule}; }
}
