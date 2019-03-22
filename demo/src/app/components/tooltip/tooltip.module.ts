import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdTooltipAutoclose } from './demos/autoclose/tooltip-autoclose';
import { NgbxdTooltipBasic } from './demos/basic/tooltip-basic';
import { NgbxdTooltipConfig } from './demos/config/tooltip-config';
import { NgbxdTooltipContainer } from './demos/container/tooltip-container';
import { NgbxdTooltipCustomclass } from './demos/customclass/tooltip-customclass';
import { NgbxdTooltipDelay } from './demos/delay/tooltip-delay';
import { NgbxdTooltipTplcontent } from './demos/tplcontent/tooltip-tplcontent';
import { NgbxdTooltipTplwithcontext } from './demos/tplwithcontext/tooltip-tplwithcontext';
import { NgbxdTooltipTriggers } from './demos/triggers/tooltip-triggers';

const DEMO_DIRECTIVES = [
  NgbxdTooltipBasic,
  NgbxdTooltipContainer,
  NgbxdTooltipCustomclass,
  NgbxdTooltipDelay,
  NgbxdTooltipTplcontent,
  NgbxdTooltipTriggers,
  NgbxdTooltipAutoclose,
  NgbxdTooltipConfig,
  NgbxdTooltipTplwithcontext
];

const DEMOS = {
  basic: {
    title: 'Quick and easy tooltips',
    type: NgbxdTooltipBasic,
    code: require('!!raw-loader!./demos/basic/tooltip-basic'),
    markup: require('!!raw-loader!./demos/basic/tooltip-basic.html')
  },
  tplcontent: {
    title: 'HTML and bindings in tooltips',
    type: NgbxdTooltipTplcontent,
    code: require('!!raw-loader!./demos/tplcontent/tooltip-tplcontent'),
    markup: require('!!raw-loader!./demos/tplcontent/tooltip-tplcontent.html')
  },
  triggers: {
    title: 'Custom and manual triggers',
    type: NgbxdTooltipTriggers,
    code: require('!!raw-loader!./demos/triggers/tooltip-triggers'),
    markup: require('!!raw-loader!./demos/triggers/tooltip-triggers.html')
  },
  autoclose: {
    title: 'Automatic closing with keyboard and mouse',
    type: NgbxdTooltipAutoclose,
    code: require('!!raw-loader!./demos/autoclose/tooltip-autoclose'),
    markup: require('!!raw-loader!./demos/autoclose/tooltip-autoclose.html')
  },
  tplwithcontext: {
    title: 'Context and manual triggers',
    type: NgbxdTooltipTplwithcontext,
    code: require('!!raw-loader!./demos/tplwithcontext/tooltip-tplwithcontext'),
    markup: require('!!raw-loader!./demos/tplwithcontext/tooltip-tplwithcontext.html')
  },
  delay: {
    title: 'Open and close delays',
    type: NgbxdTooltipDelay,
    code: require('!!raw-loader!./demos/delay/tooltip-delay'),
    markup: require('!!raw-loader!./demos/delay/tooltip-delay.html')
  },
  container: {
    title: 'Append tooltip in the body',
    type: NgbxdTooltipContainer,
    code: require('!!raw-loader!./demos/container/tooltip-container'),
    markup: require('!!raw-loader!./demos/container/tooltip-container.html')
  },
  'customclass': {
    title: 'Tooltip with custom class',
    type: NgbxdTooltipCustomclass,
    code: require('!!raw-loader!./demos/customclass/tooltip-customclass'),
    markup: require('!!raw-loader!./demos/customclass/tooltip-customclass.html')
  },
  config: {
    title: 'Global configuration of tooltips',
    type: NgbxdTooltipConfig,
    code: require('!!raw-loader!./demos/config/tooltip-config'),
    markup: require('!!raw-loader!./demos/config/tooltip-config.html')
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
export class NgbxdTooltipModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('tooltip', DEMOS);
  }
}
