import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgbxdDemoList } from '../../shared';
import { NgbxdOverview } from '../../shared/overview';

@Component({
  selector: 'ngbxd-datepicker-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker-overview.component.html',
  host: {
    '[class.overview]': 'true'
  }
})

export class NgbxdDatepickerOverviewComponent {

  snippets = {
    basic: `
<!-- 1. inline datepicker -->
<ngbx-datepicker #d></ngbx-datepicker>

<!-- 2. datepicker in the popup -->
<input type="text" ngbxDatepicker #d="ngbxDatepicker"/>
`,
    popup: `
<input type="text" ngbxDatepicker #d="ngbxDatepicker"/>
<button (click)="d.toggle()">Toggle</button>
`,
    form: `
<input type="text" ngbxDatepicker [(ngModel)]="date"/>
`,
    selection: `
<!-- inline -->
<ngbx-datepicker (select)="onDateSelect($event)"></ngbx-datepicker>

<!-- in the popup -->
<input type="text" ngbxDatepicker (dateSelect)="onDateSelect($event)"/>
`,
    navigation: `
<ngbx-datepicker #d [startDate]="{year: 1789, month: 7}"></ngbx-datepicker>
<button (click)="d.navigateTo({year: 2048, month: 1})">Goto JAN 2048</button>
`,
    dateStruct: `
const date: NgbxDateStruct = { year: 1789, month: 7, day: 14 }; // July, 14 1789
`,
date: `
const date: NgbxDate = new NgbxDate(1789, 7, 14);                // July, 14 1789

date.before({ year: 1789, month: 7, day: 14 });                // compare to a structure
date.equals(NgbxDate.from({ year: 1789, month: 7, day: 14 }));  // or to another date object
`,
    nativeAdapter: `
// native adapter is bundled with library
providers: [{provide: NgbxDateAdapter, useClass: NgbxDateNativeAdapter}]

// or another native adapter that works with UTC dates
providers: [{provide: NgbxDateAdapter, useClass: NgbxDateNativeUTCAdapter}]
`,
    adapter: `
@Injectable()
export abstract class NgbxDateAdapter<D> {
  abstract fromModel(value: D): NgbxDateStruct; // from your model -> internal model
  abstract toModel(date: NgbxDateStruct): D; // from internal model -> your mode
}

// create your own if necessary
providers: [{provide: NgbxDateAdapter, useClass: YourOwnDateAdapter}]
`,
    formatter: `
@Injectable()
export abstract class NgbxDateParserFormatter {
  abstract parse(value: string): NgbxDateStruct; // from input -> internal model
  abstract format(date: NgbxDateStruct): string; // from internal model -> string
}

// create your own if necessary
providers: [{provide: NgbxDateParserFormatter, useClass: YourOwnParserFormatter}]
`,
    dayTemplate: `
<ng-template #t let-date>
	{{ date.day }}
</ng-template>

<ngbxDatepicker [dayTemplate]=“t”/>
`,
    todayHTML: `
<div class="ngbx-dp-day ngbx-dp-today">
  <!-- day cell content omitted -->
</div>
`,
    todayTemplate: `
<ng-template #t let-today="today">
  <span *ngIf="today">...</span>
</ng-template>

<ngbxDatepicker [dayTemplate]=“t”/>
`,
    footerTemplate: `
<ng-template #t>
  <button (click)="model = today">Today</button>
</ng-template>

<ngbxDatepicker [footerTemplate]=“t”/>
`,
  disablingTS: `
// disable the 13th of each month
const isDisabled = (date: NgbxDate, current: {month: number}) => date.day === 13;
`,
  disablingHTML: `
<ngbx-datepicker [minDate]="{year: 2010, month: 1, day: 1}"
                [maxDate]="{year: 2048, month: 12, day: 31}"
                [markDisabled]="isDisabled">
</ngbx-datepicker>
`,
  i18n: `
@Injectable()
export abstract class NgbxDatepickerI18n {
  abstract getWeekdayShortName(weekday: number): string;
  abstract getMonthShortName(month: number): string;
  abstract getMonthFullName(month: number): string;
  abstract getDayAriaLabel(date: NgbxDateStruct): string;
}

// provide your own if necessary
providers: [{provide: NgbxDatepickerI18n, useClass: YourOwnDatepickerI18n}]
`
  };

  sections: NgbxdOverview = {};

  constructor(demoList: NgbxdDemoList) {
    this.sections = demoList.getOverviewSections('datepicker');
  }
}
