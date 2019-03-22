import {NgModule, ModuleWithProviders} from '@angular/core';
import {NgbxButtonLabel} from './label';
import {NgbxCheckBox} from './checkbox';
import {NgbxRadio, NgbxRadioGroup} from './radio';

export {NgbxButtonLabel} from './label';
export {NgbxCheckBox} from './checkbox';
export {NgbxRadio, NgbxRadioGroup} from './radio';


const NGB_BUTTON_DIRECTIVES = [NgbxButtonLabel, NgbxCheckBox, NgbxRadioGroup, NgbxRadio];

@NgModule({declarations: NGB_BUTTON_DIRECTIVES, exports: NGB_BUTTON_DIRECTIVES})
export class NgbxButtonsModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxButtonsModule}; }
}
