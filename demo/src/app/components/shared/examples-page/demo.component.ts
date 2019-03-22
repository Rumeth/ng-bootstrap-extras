import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Analytics } from '../../../shared/analytics/analytics';

@Component({
  selector: 'ngbxd-widget-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demo.component.html'
})
export class NgbxdWidgetDemoComponent {
  @Input() demoTitle: string;
  @Input() component: string;
  @Input() id: string;
  @Input() code: string;
  @Input() markup: string;

  constructor(private _analytics: Analytics) {}

  trackStackBlitzClick() {
    this._analytics.trackEvent('StackBlitz View', this.component + ' ' + this.id);
  }
}
