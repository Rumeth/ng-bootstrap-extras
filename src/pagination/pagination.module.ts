import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  NgbxPagination,
  NgbxPaginationEllipsis,
  NgbxPaginationFirst,
  NgbxPaginationLast,
  NgbxPaginationNext,
  NgbxPaginationNumber,
  NgbxPaginationPrevious
} from './pagination';

export {
  NgbxPagination,
  NgbxPaginationEllipsis,
  NgbxPaginationFirst,
  NgbxPaginationLast,
  NgbxPaginationNext,
  NgbxPaginationNumber,
  NgbxPaginationPrevious
} from './pagination';
export {NgbxPaginationConfig} from './pagination-config';

const DIRECTIVES = [
  NgbxPagination, NgbxPaginationEllipsis, NgbxPaginationFirst, NgbxPaginationLast, NgbxPaginationNext, NgbxPaginationNumber,
  NgbxPaginationPrevious
];

@NgModule({declarations: DIRECTIVES, exports: DIRECTIVES, imports: [CommonModule]})
export class NgbxPaginationModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxPaginationModule}; }
}
