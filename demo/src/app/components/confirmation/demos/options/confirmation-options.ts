import { Component } from '@angular/core';
import { NgbxConfirmation } from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-confirmation-options',
  templateUrl: './confirmation-options.html'
})
export class NgbxdConfirmationOptions {
  constructor(private ngbxConfirmation: NgbxConfirmation) {}

  openSm() {
    this.ngbxConfirmation.open( { size: 'sm' });
  }

  openLg() {
    this.ngbxConfirmation.open( { size: 'lg' });
  }

  openVerticallyCentered() {
    this.ngbxConfirmation.open( { centered: true });
  }
}
