import {Component} from '@angular/core';
import {NgbxPaginationConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-pagination-disabled',
  templateUrl: './pagination-disabled.html'
})
export class NgbxdPaginationDisabled {
  page = 3;
  isDisabled = true;

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
}
