import {Component} from '@angular/core';

@Component({
  selector: 'ngbxd-pagination-customization',
  templateUrl: './pagination-customization.html'
})
export class NgbxdPaginationCustomization {
  page = 4;

  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  }
}
