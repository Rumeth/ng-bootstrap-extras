import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdProgressbarBasic } from './demos/basic/progressbar-basic';
import { NgbxdProgressbarConfig } from './demos/config/progressbar-config';
import { NgbxdProgressbarHeight } from './demos/height/progressbar-height';
import { NgbxdProgressbarLabels } from './demos/labels/progressbar-labels';
import { NgbxdProgressbarShowvalue } from './demos/showvalue/progressbar-showvalue';
import { NgbxdProgressbarStriped } from './demos/striped/progressbar-striped';

const DEMO_DIRECTIVES = [
  NgbxdProgressbarBasic,
  NgbxdProgressbarShowvalue,
  NgbxdProgressbarStriped,
  NgbxdProgressbarConfig,
  NgbxdProgressbarLabels,
  NgbxdProgressbarHeight
];

const DEMOS = {
  basic: {
    title: 'Contextual progress bars',
    type: NgbxdProgressbarBasic,
    code: require('!!raw-loader!./demos/basic/progressbar-basic'),
    markup: require('!!raw-loader!./demos/basic/progressbar-basic.html')
  },
  showvalue: {
    title: 'Progress bars with current value labels',
    type: NgbxdProgressbarShowvalue,
    code: require('!!raw-loader!./demos/showvalue/progressbar-showvalue'),
    markup: require('!!raw-loader!./demos/showvalue/progressbar-showvalue.html')
  },
  striped: {
    title: 'Striped progress bars',
    type: NgbxdProgressbarStriped,
    code: require('!!raw-loader!./demos/striped/progressbar-striped'),
    markup: require('!!raw-loader!./demos/striped/progressbar-striped.html')
  },
  labels: {
    title: 'Progress bars with custom labels',
    type: NgbxdProgressbarLabels,
    code: require('!!raw-loader!./demos/labels/progressbar-labels'),
    markup: require('!!raw-loader!./demos/labels/progressbar-labels.html')
  },
  height: {
    title: 'Progress bars with height',
    type: NgbxdProgressbarHeight,
    code: require('!!raw-loader!./demos/height/progressbar-height'),
    markup: require('!!raw-loader!./demos/height/progressbar-height.html')
  },
  config: {
    title: 'Global configuration of progress bars',
    type: NgbxdProgressbarConfig,
    code: require('!!raw-loader!./demos/config/progressbar-config'),
    markup: require('!!raw-loader!./demos/config/progressbar-config.html')
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
export class NgbxdProgressbarModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('progressbar', DEMOS);
  }
}
