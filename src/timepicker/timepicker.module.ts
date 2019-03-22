import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbxTimepicker} from './timepicker';

export {NgbxTimepicker} from './timepicker';
export {NgbxTimepickerConfig} from './timepicker-config';
export {NgbxTimeStruct} from './ngbx-time-struct';
export {NgbxTimeAdapter} from './ngbx-time-adapter';

@NgModule({declarations: [NgbxTimepicker], exports: [NgbxTimepicker], imports: [CommonModule]})
export class NgbxTimepickerModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxTimepickerModule}; }
}
