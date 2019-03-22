import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbxHighlight} from './highlight';
import {NgbxTypeaheadWindow} from './typeahead-window';
import {NgbxTypeahead} from './typeahead';

export {NgbxHighlight} from './highlight';
export {NgbxTypeaheadWindow} from './typeahead-window';
export {NgbxTypeaheadConfig} from './typeahead-config';
export {NgbxTypeahead, NgbxTypeaheadSelectItemEvent} from './typeahead';

@NgModule({
  declarations: [NgbxTypeahead, NgbxHighlight, NgbxTypeaheadWindow],
  exports: [NgbxTypeahead, NgbxHighlight],
  imports: [CommonModule],
  entryComponents: [NgbxTypeaheadWindow]
})
export class NgbxTypeaheadModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxTypeaheadModule}; }
}
