import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbxAlert} from './alert';

export {NgbxAlert} from './alert';
export {NgbxAlertConfig} from './alert-config';

@NgModule({declarations: [NgbxAlert], exports: [NgbxAlert], imports: [CommonModule], entryComponents: [NgbxAlert]})
export class NgbxAlertModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxAlertModule}; }
}
