import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdConfirmationBasic } from './demos/basic/confirmation-basic';
import { NgbxdConfirmationConfig } from './demos/config/confirmation-config';
import { NgbxdConfirmationOptions } from './demos/options/confirmation-options';

const DEMO_DIRECTIVES = [
  NgbxdConfirmationBasic,
  NgbxdConfirmationOptions,
  NgbxdConfirmationConfig
];

const DEMOS = {
  basic: {
    title: 'Confirmation Dialog with default options',
    type: NgbxdConfirmationBasic,
    code: require('!!raw-loader!./demos/basic/confirmation-basic'),
    markup: require('!!raw-loader!./demos/basic/confirmation-basic.html')
  },
  options: {
    title: 'Confirmation Dialog with options',
    type: NgbxdConfirmationOptions,
    code: require('!!raw-loader!./demos/options/confirmation-options'),
    markup: require('!!raw-loader!./demos/options/confirmation-options.html')
  },
  config: {
    title: 'Global configuration of Confirmation Dialog',
    type: NgbxdConfirmationConfig,
    code: require('!!raw-loader!./demos/config/confirmation-config'),
    markup: require('!!raw-loader!./demos/config/confirmation-config.html')
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
  imports: [NgbxdSharedModule, NgbxdComponentsSharedModule],
  declarations: [
    ...DEMO_DIRECTIVES
  ],
  entryComponents: [
    ...DEMO_DIRECTIVES
  ]
})
export class NgbxdConfirmationModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('confirmation', DEMOS);
  }
}
