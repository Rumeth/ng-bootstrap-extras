import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbxDatepicker} from './datepicker';
import {NgbxDatepickerMonthView} from './datepicker-month-view';
import {NgbxDatepickerNavigation} from './datepicker-navigation';
import {NgbxInputDatepicker} from './datepicker-input';
import {NgbxDatepickerDayView} from './datepicker-day-view';
import {NgbxDatepickerNavigationSelect} from './datepicker-navigation-select';

export {NgbxDatepicker, NgbxDatepickerNavigateEvent} from './datepicker';
export {NgbxInputDatepicker} from './datepicker-input';
export {NgbxCalendar, NgbxPeriod} from './ngbx-calendar';
export {NgbxCalendarIslamicCivil} from './hijri/ngbx-calendar-islamic-civil';
export {NgbxCalendarIslamicUmalqura} from './hijri/ngbx-calendar-islamic-umalqura';
export {NgbxCalendarPersian} from './jalali/ngbx-calendar-persian';
export {NgbxCalendarHebrew} from './hebrew/ngbx-calendar-hebrew';
export {NgbxDatepickerI18nHebrew} from './hebrew/datepicker-i18n-hebrew';
export {NgbxDatepickerMonthView} from './datepicker-month-view';
export {NgbxDatepickerDayView} from './datepicker-day-view';
export {NgbxDatepickerNavigation} from './datepicker-navigation';
export {NgbxDatepickerNavigationSelect} from './datepicker-navigation-select';
export {NgbxDatepickerConfig} from './datepicker-config';
export {NgbxDatepickerI18n} from './datepicker-i18n';
export {NgbxDateStruct} from './ngbx-date-struct';
export {NgbxDate} from './ngbx-date';
export {NgbxDateAdapter} from './adapters/ngbx-date-adapter';
export {NgbxDateNativeAdapter} from './adapters/ngbx-date-native-adapter';
export {NgbxDateNativeUTCAdapter} from './adapters/ngbx-date-native-utc-adapter';
export {NgbxDateParserFormatter} from './ngbx-date-parser-formatter';

@NgModule({
  declarations: [
    NgbxDatepicker, NgbxDatepickerMonthView, NgbxDatepickerNavigation, NgbxDatepickerNavigationSelect, NgbxDatepickerDayView,
    NgbxInputDatepicker
  ],
  exports: [NgbxDatepicker, NgbxInputDatepicker],
  imports: [CommonModule, FormsModule],
  entryComponents: [NgbxDatepicker]
})
export class NgbxDatepickerModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxDatepickerModule}; }
}
