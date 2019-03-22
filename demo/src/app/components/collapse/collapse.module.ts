import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdCollapseBasic } from './demos/basic/collapse-basic';

const DEMO_DIRECTIVES = [NgbxdCollapseBasic];

const DEMOS = {
  basic: {
    title: 'Collapse',
    type: NgbxdCollapseBasic,
    code: require('!!raw-loader!./demos/basic/collapse-basic'),
    markup: require('!!raw-loader!./demos/basic/collapse-basic.html')
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
export class NgbxdCollapseModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('collapse', DEMOS);
  }
}
