import { Component, Input } from '@angular/core';
import { NgbxActiveModal, NgbxModal } from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbxdModalContent {
  @Input() name;

  constructor(public activeModal: NgbxActiveModal) {}
}

@Component({
  selector: 'ngbxd-modal-component',
  templateUrl: './modal-component.html'
})
export class NgbxdModalComponent {
  constructor(private modalService: NgbxModal) {}

  open() {
    const modalRef = this.modalService.open(NgbxdModalContent);
    modalRef.componentInstance.name = 'World';
  }
}
