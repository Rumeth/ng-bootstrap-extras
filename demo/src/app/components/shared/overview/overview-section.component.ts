import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NgbxdOverviewSection } from './overview';

@Component({
  selector: 'ngbxd-overview-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'd-block'
  },
  template: `
    <h2>
      <a class="title-fragment" [routerLink]="" [fragment]="section.fragment" ngbxdFragment>
        <img src="img/link-symbol.svg" />
      </a>
      {{ section.title }}
    </h2>

    <ng-content></ng-content>
  `
})
export class NgbxdOverviewSectionComponent {
  @Input() section: NgbxdOverviewSection;
}
