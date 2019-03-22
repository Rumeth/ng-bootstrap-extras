import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdDatepickerAdapter } from './demos/adapter/datepicker-adapter';
import { NgbxdDatepickerBasic } from './demos/basic/datepicker-basic';
import { DEMO_CALENDAR_DIRECTIVES, NgbxdDatepickerCalendarsComponent } from './calendars/datepicker-calendars.component';
import { NgbxdDatepickerConfig } from './demos/config/datepicker-config';
import { NgbxdDatepickerCustomday } from './demos/customday/datepicker-customday';
import { NgbxdDatepickerFootertemplate } from './demos/footertemplate/datepicker-footertemplate';
import { NgbxdDatepickerDisabled } from './demos/disabled/datepicker-disabled';
import { NgbxdDatepickerI18n } from './demos/i18n/datepicker-i18n';
import { NgbxdDatepickerMultiple } from './demos/multiple/datepicker-multiple';
import { NgbxdDatepickerPopup } from './demos/popup/datepicker-popup';
import { NgbxdDatepickerRange } from './demos/range/datepicker-range';
import { NgbxdDatepickerOverviewComponent } from './overview/datepicker-overview.component';
import { NgbxdDatepickerOverviewDemoComponent } from './overview/demo/datepicker-overview-demo.component';

const DEMO_DIRECTIVES = [
  NgbxdDatepickerBasic,
  NgbxdDatepickerPopup,
  NgbxdDatepickerDisabled,
  NgbxdDatepickerI18n,
  NgbxdDatepickerCustomday,
  NgbxdDatepickerFootertemplate,
  NgbxdDatepickerConfig,
  NgbxdDatepickerMultiple,
  NgbxdDatepickerRange,
  NgbxdDatepickerAdapter
];

const OVERVIEW = {
  'basic-usage': 'Basic Usage',
  'getting-date': 'Getting/setting a date',
  'date-model': 'Date model and format',
  navigation: 'Moving around',
  'limiting-dates': 'Disabling and limiting dates',
  'day-template': 'Day display customization',
  today: 'Today\'s date',
  'footer-template': 'Custom footer',
  range: 'Range selection',
  i18n: 'Internationalization',
  'keyboard-shortcuts': 'Keyboard shortcuts'
};

const DEMOS = {
  basic: {
    title: 'Basic datepicker',
    type: NgbxdDatepickerBasic,
    code: require('!!raw-loader!./demos/basic/datepicker-basic'),
    markup: require('!!raw-loader!./demos/basic/datepicker-basic.html')
  },
  popup: {
    title: 'Datepicker in a popup',
    type: NgbxdDatepickerPopup,
    code: require('!!raw-loader!./demos/popup/datepicker-popup'),
    markup: require('!!raw-loader!./demos/popup/datepicker-popup.html')
  },
  multiple: {
    title: 'Multiple months',
    type: NgbxdDatepickerMultiple,
    code: require('!!raw-loader!./demos/multiple/datepicker-multiple'),
    markup: require('!!raw-loader!./demos/multiple/datepicker-multiple.html')
  },
  range: {
    title: 'Range selection',
    type: NgbxdDatepickerRange,
    code: require('!!raw-loader!./demos/range/datepicker-range'),
    markup: require('!!raw-loader!./demos/range/datepicker-range.html')
  },
  disabled: {
    title: 'Disabled datepicker',
    type: NgbxdDatepickerDisabled,
    code: require('!!raw-loader!./demos/disabled/datepicker-disabled'),
    markup: require('!!raw-loader!./demos/disabled/datepicker-disabled.html')
  },
  adapter: {
    title: 'Custom date adapter',
    type: NgbxdDatepickerAdapter,
    code: require('!!raw-loader!./demos/adapter/datepicker-adapter'),
    markup: require('!!raw-loader!./demos/adapter/datepicker-adapter.html')
  },
  i18n: {
    title: 'Internationalization of datepickers',
    type: NgbxdDatepickerI18n,
    code: require('!!raw-loader!./demos/i18n/datepicker-i18n'),
    markup: require('!!raw-loader!./demos/i18n/datepicker-i18n.html')
  },
  customday: {
    title: 'Custom day view',
    type: NgbxdDatepickerCustomday,
    code: require('!!raw-loader!./demos/customday/datepicker-customday'),
    markup: require('!!raw-loader!./demos/customday/datepicker-customday.html')
  },
  footertemplate: {
    title: 'Footer template',
    type: NgbxdDatepickerFootertemplate,
    code: require('!!raw-loader!./demos/footertemplate/datepicker-footertemplate'),
    markup: require('!!raw-loader!./demos/footertemplate/datepicker-footertemplate.html')
  },
  config: {
    title: 'Global configuration of datepickers',
    type: NgbxdDatepickerConfig,
    code: require('!!raw-loader!./demos/config/datepicker-config'),
    markup: require('!!raw-loader!./demos/config/datepicker-config.html')
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: '',
    component: ComponentWrapper,
    data: { OVERVIEW },
    children: [
      { path: 'overview', component: NgbxdDatepickerOverviewComponent },
      { path: 'examples', component: NgbxdExamplesPage },
      { path: 'calendars', component: NgbxdDatepickerCalendarsComponent },
      { path: 'api', component: NgbxdApiPage }
    ]
  }
];

@NgModule({
  imports: [
    NgbxdSharedModule,
    NgbxdComponentsSharedModule
  ],
  declarations: [
    ...DEMO_DIRECTIVES,
    ...DEMO_CALENDAR_DIRECTIVES,
    NgbxdDatepickerCalendarsComponent,
    NgbxdDatepickerOverviewComponent,
    NgbxdDatepickerOverviewDemoComponent
  ],
  entryComponents: [...DEMO_DIRECTIVES, ...DEMO_CALENDAR_DIRECTIVES]
})
export class NgbxdDatepickerModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('datepicker', DEMOS, OVERVIEW);
  }
}
