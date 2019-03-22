import {NgbxDate} from './ngbx-date';
import {NgbxDateStruct} from './ngbx-date-struct';
import {DayTemplateContext} from './datepicker-day-template-context';

export type NgbxMarkDisabled = (date: NgbxDateStruct, current: {year: number, month: number}) => boolean;
export type NgbxDayTemplateData = (date: NgbxDateStruct, current: {year: number, month: number}) => any;

export type DayViewModel = {
  date: NgbxDate,
  context: DayTemplateContext,
  tabindex: number,
  ariaLabel: string,
  hidden: boolean
};

export type WeekViewModel = {
  number: number,
  days: DayViewModel[],
  collapsed: boolean
};

export type MonthViewModel = {
  firstDate: NgbxDate,
  lastDate: NgbxDate,
  number: number,
  year: number,
  weeks: WeekViewModel[],
  weekdays: number[]
};

// clang-format off
export type DatepickerViewModel = {
  dayTemplateData?: NgbxDayTemplateData,
  disabled: boolean,
  displayMonths: number,
  firstDate?: NgbxDate,
  firstDayOfWeek: number,
  focusDate?: NgbxDate,
  focusVisible: boolean,
  lastDate?: NgbxDate,
  markDisabled?: NgbxMarkDisabled,
  maxDate?: NgbxDate,
  minDate?: NgbxDate,
  months: MonthViewModel[],
  navigation: 'select' | 'arrows' | 'none',
  outsideDays: 'visible' | 'collapsed' | 'hidden',
  prevDisabled: boolean,
  nextDisabled: boolean,
  selectBoxes: {
    years: number[],
    months: number[]
  },
  selectedDate: NgbxDate
};
// clang-format on

export enum NavigationEvent {
  PREV,
  NEXT
}
