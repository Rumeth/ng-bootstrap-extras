import {NgModule, ModuleWithProviders} from '@angular/core';
import {NgbxCollapse} from './collapse';

export {NgbxCollapse} from './collapse';

@NgModule({declarations: [NgbxCollapse], exports: [NgbxCollapse]})
export class NgbxCollapseModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxCollapseModule}; }
}
