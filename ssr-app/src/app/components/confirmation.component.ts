import { Component } from '@angular/core';

import {NgbxConfirmation, ConfirmationDismissReasons} from 'ng-bootstrap-extras';

function getActionReason(reason: any): string {
  if (reason === ConfirmationDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ConfirmationDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else if (reason === ConfirmationDismissReasons.ACCEPT) {
    return 'by clicking on accept button';
  } else if (reason === ConfirmationDismissReasons.REJECT) {
    return 'by clicking on reject button';
  } else if (reason === ConfirmationDismissReasons.DISMISS) {
    return 'by clicking on dismiss button';
  } else {
    return  `with: ${reason}`;
  }
}

@Component({
  selector: 'confirmation-component',
  template: `
    <button class="btn btn-outline-primary" (click)="open()">Open Confirmation Dialog</button>

    <pre>{{closeResult}}</pre>
  `
})
export class ConfirmationComponent {
  closeResult: string;

  constructor(private ngbxConfirmation: NgbxConfirmation) {}

  open() {
    this.ngbxConfirmation.open({ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed ${getActionReason(result)}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${getActionReason(reason)}`;
    });
  }
}
