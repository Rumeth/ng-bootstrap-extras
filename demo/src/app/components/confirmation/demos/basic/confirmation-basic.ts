import {Component} from '@angular/core';
import {ConfirmationDismissReasons, NgbxConfirmation} from 'ng-bootstrap-extras';

@Component({selector: 'ngbxd-modal-basic', templateUrl: './confirmation-basic.html'})
export class NgbxdConfirmationBasic {
  closeResult: string;

  constructor(private ngbxConfirmation: NgbxConfirmation) {}

  open() {
    this.ngbxConfirmation.open({ariaLabelledBy: 'modal-basic-title'})
        .result.then(
            (result) => {
              this.closeResult = `Closed ${this.getActionReason(result)}`;
            },
            (reason) => {
              this.closeResult = `Dismissed ${this.getActionReason(reason)}`;
            });
  }

  private getActionReason(reason: any): string {
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
      return `with: ${reason}`;
    }
  }
}
