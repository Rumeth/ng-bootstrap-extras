import { Component } from '@angular/core';
import { NgbxActiveModal, NgbxModal } from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbxdModalConfirm {
  constructor(public modal: NgbxActiveModal) {}
}

@Component({
  selector: 'ngbxd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbxAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbxdModalConfirmAutofocus {
  constructor(public modal: NgbxActiveModal) {}
}

const MODALS = {
  focusFirst: NgbxdModalConfirm,
  autofocus: NgbxdModalConfirmAutofocus
};

@Component({
  selector: 'ngbxd-modal-focus',
  templateUrl: './modal-focus.html'
})
export class NgbxdModalFocus {
  withAutofocus = `<button type="button" ngbxAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  constructor(private _modalService: NgbxModal) {}

  open(name: string) {
    this._modalService.open(MODALS[name]);
  }
}
