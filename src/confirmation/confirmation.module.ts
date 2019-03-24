import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbxConfirmation} from './confirmation';

import {NgbxConfirmationDialog} from './confirmation-dialog';

export {NgbxConfirmationDialog} from './confirmation-dialog';
export {NgbxConfirmation} from './confirmation';
export {NgbxConfirmationConfig, NgbxConfirmationOptions} from './confirmation-config';
export {ConfirmationDismissReasons} from './confirmation-dismiss-reasons';

@NgModule({
  imports: [CommonModule, BrowserModule, NgbModalModule],
  declarations: [NgbxConfirmationDialog],
  entryComponents: [NgbxConfirmationDialog],
  providers: [NgbxConfirmation]
})

export class NgbxConfirmationModule {
}
