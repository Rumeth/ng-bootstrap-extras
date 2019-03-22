import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {Observable} from 'rxjs';
import {CountryService} from './country.service';
import {Country} from './country';
import {NgbxdSortableHeader, SortEvent} from './sortable.directive';

@Component({
  selector: 'ngbxd-table-complete',
  templateUrl: './table-complete.html',
  providers: [CountryService, DecimalPipe]
})
export class NgbxdTableComplete {
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbxdSortableHeader) headers: QueryList<NgbxdSortableHeader>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
