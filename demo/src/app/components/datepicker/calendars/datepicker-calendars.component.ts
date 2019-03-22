import { Component } from '@angular/core';
import { NgbxdDatepickerHebrew } from '../demos/hebrew/datepicker-hebrew';
import { NgbxdDatepickerIslamiccivil } from '../demos/islamiccivil/datepicker-islamiccivil';
import { NgbxdDatepickerIslamicumalqura } from '../demos/islamicumalqura/datepicker-islamicumalqura';
import { NgbxdDatepickerJalali } from '../demos/jalali/datepicker-jalali';
import { NgbxdExamplesPage } from '../../shared/examples-page/examples.component';

export const DEMO_CALENDAR_DIRECTIVES = [
  NgbxdDatepickerHebrew,
  NgbxdDatepickerJalali,
  NgbxdDatepickerIslamiccivil,
  NgbxdDatepickerIslamicumalqura,
];

const DEMOS = [
  {
    id: 'hebrew',
    title: 'Hebrew',
    type: NgbxdDatepickerHebrew,
    code: require('!!raw-loader!./../demos/hebrew/datepicker-hebrew'),
    markup: require('!!raw-loader!./../demos/hebrew/datepicker-hebrew.html')
  },
  {
    id: 'jalali',
    title: 'Jalali',
    type: NgbxdDatepickerJalali,
    code: require('!!raw-loader!./../demos/jalali/datepicker-jalali'),
    markup: require('!!raw-loader!./../demos/jalali/datepicker-jalali.html')
  },
  {
    id: 'islamiccivil',
    title: 'Islamic Civil',
    type: NgbxdDatepickerIslamiccivil,
    code: require('!!raw-loader!./../demos/islamiccivil/datepicker-islamiccivil'),
    markup: require('!!raw-loader!./../demos/islamiccivil/datepicker-islamiccivil.html')
  },
  {
    id: 'islamicumalqura',
    title: 'Islamic Umm al-Qura',
    type: NgbxdDatepickerIslamicumalqura,
    code: require('!!raw-loader!./../demos/islamicumalqura/datepicker-islamicumalqura'),
    markup: require('!!raw-loader!./../demos/islamicumalqura/datepicker-islamicumalqura.html')
  }
];

@Component({
  selector: 'ngbxd-datepicker-calendars',
  template: `
    <p>
      Datepicker relies on <code>NgbxCalendar</code> abstract class for calendar-related calculations.
      Default implementation is the <code>NgbxCalendarGregorian</code>, but can be any
      calendar that has notion of days, months and years.
    </p>

    <p>For instance, other calendar implementations available are:</p>
    <ul class="list-unstyled ml-4">
      <li><code>NgbxCalendarHebrew</code> + <code>NgbxDatepickerI18nHebrew</code></li>
      <li><code>NgbxCalendarPersian</code></li>
      <li><code>NgbxCalendarIslamicCivil</code></li>
      <li><code>NgbxCalendarIslamicUmalqura</code></li>
    </ul>

    <ngbx-alert [dismissible]="false">
      Please note that calendar support is experimental!
      We're not calendar experts and any community help is very much appreciated.
    </ngbx-alert>

    <p>
      To use any of them, simply provide a different calendar implementation.
      Some calendars (like Hebrew in the example and demo below) also come with i18n support
      to override the way day/week/year numerals and weekday/month names are displayed.
    </p>

    <ngbxd-code lang="typescript" [code]="snippets.calendars"></ngbxd-code>

    <br>

    <p>Here are some demos of the calendars you can use</p>

    <br>

    <ngbxd-widget-demo *ngFor="let demo of demos"
      [id]="demo.id"
      [demoTitle]="demo.title"
      [code]="demo.code"
      [markup]="demo.markup"
      component="datepicker"
    >
      <ng-template [ngComponentOutlet]="demo.type"></ng-template>
    </ngbxd-widget-demo>
  `
})
export class NgbxdDatepickerCalendarsComponent extends NgbxdExamplesPage {

  demos = DEMOS;

  snippets = {
    calendars: `
providers: [
  {provide: NgbxCalendar, useClass: NgbxCalendarHebrew},
  {provide: NgbxDatepickerI18n, useClass: NgbxDatepickerI18nHebrew}
]
`
  };
}
