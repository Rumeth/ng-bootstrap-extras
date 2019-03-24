import { Component } from '@angular/core';

import {NgbxConfirmation, NgbxConfirmationConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-confirmation-config',
  templateUrl: './confirmation-config.html',
  // add NgbxConfirmationConfig and NgbxConfirmation to the component providers
  providers: [NgbxConfirmationConfig, NgbxConfirmation]
})
export class NgbxdConfirmationConfig {
  constructor(ngbxConfirmationConfig: NgbxConfirmationConfig, private ngbxConfirmation: NgbxConfirmation) {
    // customize default values of confirmation dialog used by this component tree
    ngbxConfirmationConfig.showDismissButton = false;
  }

  open() {
    this.ngbxConfirmation.open();
  }
}

