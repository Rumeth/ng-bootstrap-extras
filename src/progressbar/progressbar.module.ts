import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbxProgressbar} from './progressbar';

export {NgbxProgressbar} from './progressbar';
export {NgbxProgressbarConfig} from './progressbar-config';

@NgModule({declarations: [NgbxProgressbar], exports: [NgbxProgressbar], imports: [CommonModule]})
export class NgbxProgressbarModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxProgressbarModule}; }
}
