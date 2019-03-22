import {Component} from '@angular/core';

import {NgbxdDemoList} from '../../shared';
import {NgbxdOverview} from '../../shared/overview';


@Component({
  selector: 'ngbxd-pagination-overview',
  templateUrl: './pagination-overview.component.html',
  host: {'[class.overview]': 'true'}
})
export class NgbxdPaginationOverviewComponent {
  NGFOR = `<table>
  <tr *ngFor="let item of items | slice: (page-1) * pageSize : (page-1) * pageSize + pageSize">
    <!-- content here -->
  </tr>
</table>`;

  NGB_PAGINATION = `<ngbx-pagination
  [(page)]="page"
  [pageSize]="pageSize"
  [collectionSize]="items.length"></ngbx-pagination>`;

  CUSTOM_CSS = `
ngbx-pagination li {
  &:first-child a {
    span {
      display: none;
    }
    &:before {
      /* provide your content here */
    }
  }
}
`;

  CUSTOM_TPL = `
<ngbx-pagination>
  <ng-template ngbxPaginationFirst>First</ng-template>
  <ng-template ngbxPaginationLast>Last</ng-template>
  <ng-template ngbxPaginationPrevious>Prev</ng-template>
  <ng-template ngbxPaginationNext>Next</ng-template>
  <ng-template ngbxPaginationEllipsis>...</ng-template>
  <ng-template ngbxPaginationNumber let-page>{{ page }}</ng-template>
</ngbx-pagination>
`;

  sections: NgbxdOverview = {};

  constructor(demoList: NgbxdDemoList) {
    this.sections = demoList.getOverviewSections('pagination');
  }
}
