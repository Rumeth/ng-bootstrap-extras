import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdTimepickerAdapter } from './demos/adapter/timepicker-adapter';
import { NgbxdTimepickerBasic } from './demos/basic/timepicker-basic';
import { NgbxdTimepickerConfig } from './demos/config/timepicker-config';
import { NgbxdTimepickerMeridian } from './demos/meridian/timepicker-meridian';
import { NgbxdTimepickerSeconds } from './demos/seconds/timepicker-seconds';
import { NgbxdTimepickerSpinners } from './demos/spinners/timepicker-spinners';
import { NgbxdTimepickerSteps } from './demos/steps/timepicker-steps';
import { NgbxdTimepickerValidation } from './demos/validation/timepicker-validation';

const DEMO_DIRECTIVES = [
  NgbxdTimepickerBasic,
  NgbxdTimepickerMeridian,
  NgbxdTimepickerSeconds,
  NgbxdTimepickerSpinners,
  NgbxdTimepickerSteps,
  NgbxdTimepickerValidation,
  NgbxdTimepickerAdapter,
  NgbxdTimepickerConfig
];

const DEMOS = {
  basic: {
    title: 'Timepicker',
    type: NgbxdTimepickerBasic,
    code: require('!!raw-loader!./demos/basic/timepicker-basic'),
    markup: require('!!raw-loader!./demos/basic/timepicker-basic.html')
  },
  meridian: {
    title: 'Meridian',
    type: NgbxdTimepickerMeridian,
    code: require('!!raw-loader!./demos/meridian/timepicker-meridian'),
    markup: require('!!raw-loader!./demos/meridian/timepicker-meridian.html')
  },
  seconds: {
    title: 'Seconds',
    type: NgbxdTimepickerSeconds,
    code: require('!!raw-loader!./demos/seconds/timepicker-seconds'),
    markup: require('!!raw-loader!./demos/seconds/timepicker-seconds.html')
  },
  spinners: {
    title: 'Spinners',
    type: NgbxdTimepickerSpinners,
    code: require('!!raw-loader!./demos/spinners/timepicker-spinners'),
    markup: require('!!raw-loader!./demos/spinners/timepicker-spinners.html')
  },
  steps: {
    title: 'Custom steps',
    type: NgbxdTimepickerSteps,
    code: require('!!raw-loader!./demos/steps/timepicker-steps'),
    markup: require('!!raw-loader!./demos/steps/timepicker-steps.html')
  },
  validation: {
    title: 'Custom validation',
    type: NgbxdTimepickerValidation,
    code: require('!!raw-loader!./demos/validation/timepicker-validation'),
    markup: require('!!raw-loader!./demos/validation/timepicker-validation.html')
  },
  adapter: {
    title: 'Custom time adapter',
    type: NgbxdTimepickerAdapter,
    code: require('!!raw-loader!./demos/adapter/timepicker-adapter'),
    markup: require('!!raw-loader!./demos/adapter/timepicker-adapter.html')
  },
  config: {
    title: 'Global configuration of timepickers',
    type: NgbxdTimepickerConfig,
    code: require('!!raw-loader!./demos/config/timepicker-config'),
    markup: require('!!raw-loader!./demos/config/timepicker-config.html')
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ComponentWrapper,
    children: [
      { path: 'examples', component: NgbxdExamplesPage },
      { path: 'api', component: NgbxdApiPage }
    ]
  }
];

@NgModule({
  imports: [
    NgbxdSharedModule,
    NgbxdComponentsSharedModule
  ],
  declarations: DEMO_DIRECTIVES,
  entryComponents: DEMO_DIRECTIVES
})
export class NgbxdTimepickerModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('timepicker', DEMOS);
  }
}
