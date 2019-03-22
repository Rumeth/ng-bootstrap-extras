import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdDropdownBasic } from './demos/basic/dropdown-basic';
import { NgbxdDropdownConfig } from './demos/config/dropdown-config';
import { NgbxdDropdownManual } from './demos/manual/dropdown-manual';
import { NgbxdDropdownSplit } from './demos/split/dropdown-split';
import { NgbxdDropdownForm } from './demos/form/dropdown-form';

const DEMO_DIRECTIVES = [
  NgbxdDropdownBasic,
  NgbxdDropdownConfig,
  NgbxdDropdownManual,
  NgbxdDropdownSplit,
  NgbxdDropdownForm
];

const DEMOS = {
  basic: {
    title: 'Dropdown',
    type: NgbxdDropdownBasic,
    code: require('!!raw-loader!./demos/basic/dropdown-basic'),
    markup: require('!!raw-loader!./demos/basic/dropdown-basic.html')
  },
  manual: {
    title: 'Manual and custom triggers',
    type: NgbxdDropdownManual,
    code: require('!!raw-loader!./demos/manual/dropdown-manual'),
    markup: require('!!raw-loader!./demos/manual/dropdown-manual.html')
  },
  split: {
    title: 'Button groups and split buttons',
    type: NgbxdDropdownSplit,
    code: require('!!raw-loader!./demos/split/dropdown-split'),
    markup: require('!!raw-loader!./demos/split/dropdown-split.html')
  },
  form: {
    title: 'Mixed menu items and form',
    type: NgbxdDropdownForm,
    code: require('!!raw-loader!./demos/form/dropdown-form'),
    markup: require('!!raw-loader!./demos/form/dropdown-form.html')
  },
  config: {
    title: 'Global configuration of dropdowns',
    type: NgbxdDropdownConfig,
    code: require('!!raw-loader!./demos/config/dropdown-config'),
    markup: require('!!raw-loader!./demos/config/dropdown-config.html')
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
export class NgbxdDropdownModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('dropdown', DEMOS);
  }
}
