import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdRatingBasic } from './demos/basic/rating-basic';
import { NgbxdRatingConfig } from './demos/config/rating-config';
import { NgbxdRatingDecimal } from './demos/decimal/rating-decimal';
import { NgbxdRatingEvents } from './demos/events/rating-events';
import { NgbxdRatingForm } from './demos/form/rating-form';
import { NgbxdRatingTemplate } from './demos/template/rating-template';

const DEMO_DIRECTIVES = [
  NgbxdRatingBasic,
  NgbxdRatingConfig,
  NgbxdRatingTemplate,
  NgbxdRatingEvents,
  NgbxdRatingDecimal,
  NgbxdRatingForm
];

const DEMOS = {
  basic: {
    title: 'Basic demo',
    type: NgbxdRatingBasic,
    code: require('!!raw-loader!./demos/basic/rating-basic'),
    markup: require('!!raw-loader!./demos/basic/rating-basic.html')
  },
  events: {
    title: 'Events and readonly ratings',
    type: NgbxdRatingEvents,
    code: require('!!raw-loader!./demos/events/rating-events'),
    markup: require('!!raw-loader!./demos/events/rating-events.html')
  },
  template: {
    title: 'Custom star template',
    type: NgbxdRatingTemplate,
    code: require('!!raw-loader!./demos/template/rating-template'),
    markup: require('!!raw-loader!./demos/template/rating-template.html')
  },
  decimal: {
    title: 'Custom decimal rating',
    type: NgbxdRatingDecimal,
    code: require('!!raw-loader!./demos/decimal/rating-decimal'),
    markup: require('!!raw-loader!./demos/decimal/rating-decimal.html')
  },
  form: {
    title: 'Form integration',
    type: NgbxdRatingForm,
    code: require('!!raw-loader!./demos/form/rating-form'),
    markup: require('!!raw-loader!./demos/form/rating-form.html')
  },
  config: {
    title: 'Global configuration of ratings',
    type: NgbxdRatingConfig,
    code: require('!!raw-loader!./demos/config/rating-config'),
    markup: require('!!raw-loader!./demos/config/rating-config.html')
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
export class NgbxdRatingModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('rating', DEMOS);
  }
}
