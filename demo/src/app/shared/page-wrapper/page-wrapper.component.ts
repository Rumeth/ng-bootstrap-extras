import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngbxd-page-wrapper',
  templateUrl: './page-wrapper.component.html'
})
export class PageWrapper {
  @Input()
  pageTitle: string;
}
