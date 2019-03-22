import {NgModule, ModuleWithProviders} from '@angular/core';
import {NgbxDropdown, NgbxDropdownAnchor, NgbxDropdownToggle, NgbxDropdownMenu, NgbxDropdownItem} from './dropdown';

export {NgbxDropdown, NgbxDropdownAnchor, NgbxDropdownToggle, NgbxDropdownMenu, NgbxDropdownItem} from './dropdown';
export {NgbxDropdownConfig} from './dropdown-config';

const NGB_DROPDOWN_DIRECTIVES = [NgbxDropdown, NgbxDropdownAnchor, NgbxDropdownToggle, NgbxDropdownMenu, NgbxDropdownItem];

@NgModule({declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES})
export class NgbxDropdownModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxDropdownModule}; }
}
