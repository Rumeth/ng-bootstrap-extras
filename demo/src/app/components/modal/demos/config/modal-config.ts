import { Component } from '@angular/core';
import { NgbxModalConfig, NgbxModal } from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-modal-config',
  templateUrl: './modal-config.html',
  // add NgbxModalConfig and NgbxModal to the component providers
  providers: [NgbxModalConfig, NgbxModal]
})
export class NgbxdModalConfig {
  constructor(config: NgbxModalConfig, private modalService: NgbxModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }
}

