import {ModuleWithProviders, NgModule} from '@angular/core';

import {NgbxModal} from './modal';
import {NgbxModalBackdrop} from './modal-backdrop';
import {NgbxModalWindow} from './modal-window';

export {NgbxModal} from './modal';
export {NgbxModalConfig, NgbxModalOptions} from './modal-config';
export {NgbxModalRef, NgbxActiveModal} from './modal-ref';
export {ModalDismissReasons} from './modal-dismiss-reasons';

@NgModule({
  declarations: [NgbxModalBackdrop, NgbxModalWindow],
  entryComponents: [NgbxModalBackdrop, NgbxModalWindow],
  providers: [NgbxModal]
})
export class NgbxModalModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxModalModule}; }
}
