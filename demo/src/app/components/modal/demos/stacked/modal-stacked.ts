import { Component } from '@angular/core';
import { NgbxActiveModal, NgbxModal } from 'ng-bootstrap-extras';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, World!</p>
      <p><button class="btn btn-lg btn-outline-primary" (click)="open()">Launch demo modal</button></p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbxdModal1Content {
  constructor(private modalService: NgbxModal, public activeModal: NgbxActiveModal) {}

  open() {
    this.modalService.open(NgbxdModal2Content, {
      size: 'lg'
    });
  }
}

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, World!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbxdModal2Content {
  constructor(public activeModal: NgbxActiveModal) {}
}

@Component({
  selector: 'ngbxd-modal-stacked',
  templateUrl: './modal-stacked.html'
})
export class NgbxdModalStacked {
  constructor(private modalService: NgbxModal) {}

  open() {
    this.modalService.open(NgbxdModal1Content);
  }
}
