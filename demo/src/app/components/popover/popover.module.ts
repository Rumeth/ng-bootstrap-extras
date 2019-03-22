import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdPopoverAutoclose } from './demos/autoclose/popover-autoclose';
import { NgbxdPopoverBasic } from './demos/basic/popover-basic';
import { NgbxdPopoverConfig } from './demos/config/popover-config';
import { NgbxdPopoverContainer } from './demos/container/popover-container';
import { NgbxdPopoverCustomclass } from './demos/customclass/popover-customclass';
import { NgbxdPopoverDelay } from './demos/delay/popover-delay';
import { NgbxdPopoverTplcontent } from './demos/tplcontent/popover-tplcontent';
import { NgbxdPopoverTplwithcontext } from './demos/tplwithcontext/popover-tplwithcontext';
import { NgbxdPopoverTriggers } from './demos/triggers/popover-triggers';
import { NgbxdPopoverVisibility } from './demos/visibility/popover-visibility';

const DEMO_DIRECTIVES = [
  NgbxdPopoverBasic,
  NgbxdPopoverTplcontent,
  NgbxdPopoverTplwithcontext,
  NgbxdPopoverTriggers,
  NgbxdPopoverAutoclose,
  NgbxdPopoverVisibility,
  NgbxdPopoverContainer,
  NgbxdPopoverCustomclass,
  NgbxdPopoverDelay,
  NgbxdPopoverConfig
];

const DEMOS = {
  basic: {
    title: 'Quick and easy popovers',
    type: NgbxdPopoverBasic,
    code: require('!!raw-loader!./demos/basic/popover-basic'),
    markup: require('!!raw-loader!./demos/basic/popover-basic.html')
  },
  tplcontent: {
    title: 'HTML and bindings in popovers',
    type: NgbxdPopoverTplcontent,
    code: require('!!raw-loader!./demos/tplcontent/popover-tplcontent'),
    markup: require('!!raw-loader!./demos/tplcontent/popover-tplcontent.html')
  },
  triggers: {
    title: 'Custom and manual triggers',
    type: NgbxdPopoverTriggers,
    code: require('!!raw-loader!./demos/triggers/popover-triggers'),
    markup: require('!!raw-loader!./demos/triggers/popover-triggers.html')
  },
  autoclose: {
    title: 'Automatic closing with keyboard and mouse',
    type: NgbxdPopoverAutoclose,
    code: require('!!raw-loader!./demos/autoclose/popover-autoclose'),
    markup: require('!!raw-loader!./demos/autoclose/popover-autoclose.html')
  },
  tplwithcontext: {
    title: 'Context and manual triggers',
    type: NgbxdPopoverTplwithcontext,
    code: require('!!raw-loader!./demos/tplwithcontext/popover-tplwithcontext'),
    markup: require('!!raw-loader!./demos/tplwithcontext/popover-tplwithcontext.html')
  },
  delay: {
    title: 'Open and close delays',
    type: NgbxdPopoverDelay,
    code: require('!!raw-loader!./demos/delay/popover-delay'),
    markup: require('!!raw-loader!./demos/delay/popover-delay.html')
  },
  visibility: {
    title: 'Popover visibility events',
    type: NgbxdPopoverVisibility,
    code: require('!!raw-loader!./demos/visibility/popover-visibility'),
    markup: require('!!raw-loader!./demos/visibility/popover-visibility.html')
  },
  container: {
    title: 'Append popover in the body',
    type: NgbxdPopoverContainer,
    code: require('!!raw-loader!./demos/container/popover-container'),
    markup: require('!!raw-loader!./demos/container/popover-container.html')
  },
  'customclass': {
    title: 'Popover with custom class',
    type: NgbxdPopoverCustomclass,
    code: require('!!raw-loader!./demos/customclass/popover-customclass'),
    markup: require('!!raw-loader!./demos/customclass/popover-customclass.html')
  },
  config: {
    title: 'Global configuration of popovers',
    type: NgbxdPopoverConfig,
    code: require('!!raw-loader!./demos/config/popover-config'),
    markup: require('!!raw-loader!./demos/config/popover-config.html')
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
export class NgbxdPopoverModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('popover', DEMOS);
  }
}
