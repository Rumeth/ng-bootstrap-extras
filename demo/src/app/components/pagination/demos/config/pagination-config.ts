import {Component} from '@angular/core';
import {NgbxPaginationConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-pagination-config',
  templateUrl: './pagination-config.html',
  providers: [NgbxPaginationConfig] // add NgbxPaginationConfig to the component providers
})
export class NgbxdPaginationConfig {
  page = 4;

  constructor(config: NgbxPaginationConfig) {
    // customize default values of paginations used by this component tree
    config.size = 'sm';
    config.boundaryLinks = true;
  }
}
