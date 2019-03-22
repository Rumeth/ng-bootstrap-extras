import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdModalBasic } from './demos/basic/modal-basic';
import { NgbxdModalComponent, NgbxdModalContent } from './demos/component/modal-component';
import { NgbxdModalConfig } from './demos/config/modal-config';
import { NgbxdModalConfirm, NgbxdModalConfirmAutofocus, NgbxdModalFocus } from './demos/focus/modal-focus';
import { NgbxdModalOptions } from './demos/options/modal-options';
import { NgbxdModal1Content, NgbxdModal2Content, NgbxdModalStacked } from './demos/stacked/modal-stacked';

const DEMO_DIRECTIVES = [
  NgbxdModalBasic,
  NgbxdModalComponent,
  NgbxdModalOptions,
  NgbxdModalStacked,
  NgbxdModalConfig,
  NgbxdModalFocus
];

const DEMOS = {
  basic: {
    title: 'Modal with default options',
    type: NgbxdModalBasic,
    code: require('!!raw-loader!./demos/basic/modal-basic'),
    markup: require('!!raw-loader!./demos/basic/modal-basic.html')
  },
  component: {
    title: 'Components as content',
    type: NgbxdModalComponent,
    code: require('!!raw-loader!./demos/component/modal-component'),
    markup: require('!!raw-loader!./demos/component/modal-component.html')
  },
  focus: {
    title: 'Focus management',
    type: NgbxdModalFocus,
    code: require('!!raw-loader!./demos/focus/modal-focus'),
    markup: require('!!raw-loader!./demos/focus/modal-focus.html')
  },
  options: {
    title: 'Modal with options',
    type: NgbxdModalOptions,
    code: require('!!raw-loader!./demos/options/modal-options'),
    markup: require('!!raw-loader!./demos/options/modal-options.html')
  },
  stacked: {
    title: 'Stacked modals',
    type: NgbxdModalStacked,
    code: require('!!raw-loader!./demos/stacked/modal-stacked'),
    markup: require('!!raw-loader!./demos/stacked/modal-stacked.html')
  },
  config: {
    title: 'Global configuration of modals',
    type: NgbxdModalConfig,
    code: require('!!raw-loader!./demos/config/modal-config'),
    markup: require('!!raw-loader!./demos/config/modal-config.html')
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
    NgbxdModalContent,
    NgbxdModal1Content,
    NgbxdModal2Content,
    NgbxdModalConfirm,
    NgbxdModalConfirmAutofocus,
    ...DEMO_DIRECTIVES
  ],
  entryComponents: [
    NgbxdModalContent,
    NgbxdModal1Content,
    NgbxdModal2Content,
    NgbxdModalConfirm,
    NgbxdModalConfirmAutofocus,
    ...DEMO_DIRECTIVES
  ]
})
export class NgbxdModalModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('modal', DEMOS);
  }
}
