import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '../../../../environments/environment';

import { NgbxdDemoList } from '../../shared';
import { NgbxdOverview } from '../../shared/overview';

@Component({
  selector: 'ngbxd-table-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-overview.component.html',
  host: {
    '[class.overview]': 'true'
  }
})
export class NgbxdTableOverviewComponent {

  bootstrapVersion = environment.bootstrap;

  sections: NgbxdOverview = {};

  constructor(demoList: NgbxdDemoList) {
    this.sections = demoList.getOverviewSections('table');
  }
}
