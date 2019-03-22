import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  NgbxAccordion,
  NgbxPanel,
  NgbxPanelTitle,
  NgbxPanelContent,
  NgbxPanelHeader,
  NgbxPanelToggle
} from './accordion';

export {
  NgbxAccordion,
  NgbxPanel,
  NgbxPanelTitle,
  NgbxPanelContent,
  NgbxPanelChangeEvent,
  NgbxPanelHeader,
  NgbxPanelHeaderContext,
  NgbxPanelToggle
} from './accordion';
export {NgbxAccordionConfig} from './accordion-config';

const NGB_ACCORDION_DIRECTIVES =
    [NgbxAccordion, NgbxPanel, NgbxPanelTitle, NgbxPanelContent, NgbxPanelHeader, NgbxPanelToggle];

@NgModule({declarations: NGB_ACCORDION_DIRECTIVES, exports: NGB_ACCORDION_DIRECTIVES, imports: [CommonModule]})
export class NgbxAccordionModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxAccordionModule}; }
}
