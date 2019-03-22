import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdAccordionBasic } from './demos/basic/accordion-basic';
import { NgbxdAccordionConfig } from './demos/config/accordion-config';
import { NgbxdAccordionPreventchange } from './demos/preventchange/accordion-preventchange';
import { NgbxdAccordionStatic } from './demos/static/accordion-static';
import { NgbxdAccordionToggle } from './demos/toggle/accordion-toggle';
import { NgbxdAccordionHeader } from './demos/header/accordion-header';

const DEMO_DIRECTIVES = [
  NgbxdAccordionBasic, NgbxdAccordionPreventchange, NgbxdAccordionStatic, NgbxdAccordionToggle, NgbxdAccordionConfig, NgbxdAccordionHeader
];

const DEMOS = {
  basic: {
    title: 'Accordion',
    code: require('!raw-loader!./demos/basic/accordion-basic'),
    markup: require('!raw-loader!./demos/basic/accordion-basic.html'),
    type: NgbxdAccordionBasic
  },
  static: {
    title: 'One open panel at a time',
    code: require('!!raw-loader!./demos/static/accordion-static'),
    markup: require('!!raw-loader!./demos/static/accordion-static.html'),
    type: NgbxdAccordionStatic
  },
  toggle: {
    title: 'Toggle panels',
    code: require('!!raw-loader!./demos/toggle/accordion-toggle'),
    markup: require('!!raw-loader!./demos/toggle/accordion-toggle.html'),
    type: NgbxdAccordionToggle
  },
  header: {
    title: 'Custom header',
    code: require('!!raw-loader!./demos/header/accordion-header'),
    markup: require('!!raw-loader!./demos/header/accordion-header.html'),
    type: NgbxdAccordionHeader
  },
  preventchange: {
    title: 'Prevent panel toggle',
    code: require('!!raw-loader!./demos/preventchange/accordion-preventchange'),
    markup: require('!!raw-loader!./demos/preventchange/accordion-preventchange.html'),
    type: NgbxdAccordionPreventchange
  },
  config: {
    title: 'Global configuration of accordions',
    code: require('!!raw-loader!./demos/config/accordion-config'),
    markup: require('!!raw-loader!./demos/config/accordion-config.html'),
    type: NgbxdAccordionConfig
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
  imports: [NgbxdSharedModule, NgbxdComponentsSharedModule],
  declarations: DEMO_DIRECTIVES,
  entryComponents: DEMO_DIRECTIVES
})
export class NgbxdAccordionModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('accordion', DEMOS);
  }
}
