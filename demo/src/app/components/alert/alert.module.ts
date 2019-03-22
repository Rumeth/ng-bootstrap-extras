import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdAlertBasic } from './demos/basic/alert-basic';
import { NgbxdAlertCloseable } from './demos/closeable/alert-closeable';
import { NgbxdAlertConfig } from './demos/config/alert-config';
import { NgbxdAlertCustom } from './demos/custom/alert-custom';
import { NgbxdAlertSelfclosing } from './demos/selfclosing/alert-selfclosing';

const DEMO_DIRECTIVES = [NgbxdAlertBasic, NgbxdAlertCloseable, NgbxdAlertSelfclosing, NgbxdAlertCustom, NgbxdAlertConfig];

const DEMOS = {
  basic: {
    title: 'Basic Alert',
    type: NgbxdAlertBasic,
    code: require('!!raw-loader!./demos/basic/alert-basic'),
    markup: require('!!raw-loader!./demos/basic/alert-basic.html')
  },
  closeable: {
    title: 'Closable Alert',
    type: NgbxdAlertCloseable,
    code: require('!!raw-loader!./demos/closeable/alert-closeable'),
    markup: require('!!raw-loader!./demos/closeable/alert-closeable.html')
  },
  selfclosing: {
    title: 'Self closing alert',
    type: NgbxdAlertSelfclosing,
    code: require('!!raw-loader!./demos/selfclosing/alert-selfclosing'),
    markup: require('!!raw-loader!./demos/selfclosing/alert-selfclosing.html')
  },
  custom: {
    title: 'Custom alert',
    type: NgbxdAlertCustom,
    code: require('!!raw-loader!./demos/custom/alert-custom'),
    markup: require('!!raw-loader!./demos/custom/alert-custom.html')
  },
  config: {
    title: 'Global configuration of alerts',
    type: NgbxdAlertConfig,
    code: require('!!raw-loader!./demos/config/alert-config'),
    markup: require('!!raw-loader!./demos/config/alert-config.html')
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  { path: '',
    component: ComponentWrapper,
    children: [
      { path: 'examples', component: NgbxdExamplesPage },
      { path: 'api', component: NgbxdApiPage }
    ]
  }
];

@NgModule({
  imports: [NgbxdSharedModule, NgbxdComponentsSharedModule ],
  declarations: DEMO_DIRECTIVES,
  entryComponents: DEMO_DIRECTIVES
})
export class NgbxdAlertModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('alert', DEMOS);
  }
}
