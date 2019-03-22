import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {NgbxDate} from './ngbx-date';
import {NgbxDatepickerI18n} from './datepicker-i18n';

@Component({
  selector: '[ngbxDatepickerDayView]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker-day-view.scss'],
  host: {
    'class': 'btn-light',
    '[class.bg-primary]': 'selected',
    '[class.text-white]': 'selected',
    '[class.text-muted]': 'isMuted()',
    '[class.outside]': 'isMuted()',
    '[class.active]': 'focused'
  },
  template: `{{ i18n.getDayNumerals(date) }}`
})
export class NgbxDatepickerDayView {
  @Input() currentMonth: number;
  @Input() date: NgbxDate;
  @Input() disabled: boolean;
  @Input() focused: boolean;
  @Input() selected: boolean;

  constructor(public i18n: NgbxDatepickerI18n) {}

  isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
