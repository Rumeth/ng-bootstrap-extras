import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdTabsetBasic } from './demos/basic/tabset-basic';
import { NgbxdTabsetConfig } from './demos/config/tabset-config';
import { NgbxdTabsetJustify } from './demos/justify/tabset-justify';
import { NgbxdTabsetOrientation } from './demos/orientation/tabset-orientation';
import { NgbxdTabsetPills } from './demos/pills/tabset-pills';
import { NgbxdTabsetPreventchange } from './demos/preventchange/tabset-preventchange';
import { NgbxdTabsetSelectbyid } from './demos/selectbyid/tabset-selectbyid';

const DEMO_DIRECTIVES = [
  NgbxdTabsetBasic,
  NgbxdTabsetPills,
  NgbxdTabsetPreventchange,
  NgbxdTabsetSelectbyid,
  NgbxdTabsetConfig,
  NgbxdTabsetJustify,
  NgbxdTabsetOrientation
];

const DEMOS = {
  basic: {
    title: 'Tabset',
    type: NgbxdTabsetBasic,
    code: require('!!raw-loader!./demos/basic/tabset-basic'),
    markup: require('!!raw-loader!./demos/basic/tabset-basic.html')
  },
  pills: {
    title: 'Pills',
    type: NgbxdTabsetPills,
    code: require('!!raw-loader!./demos/pills/tabset-pills'),
    markup: require('!!raw-loader!./demos/pills/tabset-pills.html')
  },
  selectbyid: {
    title: 'Select an active tab by id',
    type: NgbxdTabsetSelectbyid,
    code: require('!!raw-loader!./demos/selectbyid/tabset-selectbyid'),
    markup: require('!!raw-loader!./demos/selectbyid/tabset-selectbyid.html')
  },
  preventchange: {
    title: 'Prevent tab change',
    type: NgbxdTabsetPreventchange,
    code: require('!!raw-loader!./demos/preventchange/tabset-preventchange'),
    markup: require('!!raw-loader!./demos/preventchange/tabset-preventchange.html')
  },
  justify: {
    title: 'Nav justification',
    type: NgbxdTabsetJustify,
    code: require('!!raw-loader!./demos/justify/tabset-justify'),
    markup: require('!!raw-loader!./demos/justify/tabset-justify.html')
  },
  orientation: {
    title: 'Nav orientation',
    type: NgbxdTabsetOrientation,
    code: require('!!raw-loader!./demos/orientation/tabset-orientation'),
    markup: require('!!raw-loader!./demos/orientation/tabset-orientation.html')
  },
  config: {
    title: 'Global configuration of tabs',
    type: NgbxdTabsetConfig,
    code: require('!!raw-loader!./demos/config/tabset-config'),
    markup: require('!!raw-loader!./demos/config/tabset-config.html')
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
export class NgbxdTabsetModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('tabset', DEMOS);
  }
}
