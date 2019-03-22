import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbxTabset, NgbxTab, NgbxTabContent, NgbxTabTitle} from './tabset';

export {NgbxTabset, NgbxTab, NgbxTabContent, NgbxTabTitle, NgbxTabChangeEvent} from './tabset';
export {NgbxTabsetConfig} from './tabset-config';

const NGB_TABSET_DIRECTIVES = [NgbxTabset, NgbxTab, NgbxTabContent, NgbxTabTitle];

@NgModule({declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule]})
export class NgbxTabsetModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxTabsetModule}; }
}
