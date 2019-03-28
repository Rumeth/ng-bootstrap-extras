import {NgModule} from '@angular/core';
import {NgbxConfirmationModule} from './confirmation/confirmation.module';
import { NgbxMenuModule } from './menu/menu.module';

export {
  NgbxConfirmationModule,
  NgbxConfirmationDialog,
  NgbxConfirmation,
  NgbxConfirmationConfig,
  NgbxConfirmationOptions,
  ConfirmationDismissReasons
} from './confirmation/confirmation.module';

export { NgbxMenuModule,NgbxMenuItem,NgbxMenuList } from './menu/menu.module';

const NGBX_MODULES = [NgbxConfirmationModule,NgbxMenuModule];

@NgModule({imports: NGBX_MODULES, exports: NGBX_MODULES})
export class NgbxModule {
}
