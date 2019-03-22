import {Component} from '@angular/core';

import {NgbxModal, ModalDismissReasons} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-modal-basic',
  templateUrl: './modal-basic.html'
})
export class NgbxdModalBasic {
  closeResult: string;

  constructor(private modalService: NgbxModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
