import {NgModule} from '@angular/core';
import {NgbxConfirmationModule} from './confirmation/confirmation.module';

export {
  NgbxConfirmationModule,
  NgbxConfirmationDialog,
  NgbxConfirmation,
  NgbxConfirmationConfig,
  NgbxConfirmationOptions,
  ConfirmationDismissReasons
} from './confirmation/confirmation.module';

const NGBX_MODULES = [NgbxConfirmationModule];

@NgModule({imports: NGBX_MODULES, exports: NGBX_MODULES})
export class NgbxModule {
}
