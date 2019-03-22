import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdTypeaheadBasic } from './demos/basic/typeahead-basic';
import { NgbxdTypeaheadConfig } from './demos/config/typeahead-config';
import { NgbxdTypeaheadFocus } from './demos/focus/typeahead-focus';
import { NgbxdTypeaheadFormat } from './demos/format/typeahead-format';
import { NgbxdTypeaheadHttp } from './demos/http/typeahead-http';
import { NgbxdTypeaheadTemplate } from './demos/template/typeahead-template';

const DEMO_DIRECTIVES = [
  NgbxdTypeaheadFormat,
  NgbxdTypeaheadHttp,
  NgbxdTypeaheadBasic,
  NgbxdTypeaheadFocus,
  NgbxdTypeaheadTemplate,
  NgbxdTypeaheadConfig
];

const DEMOS = {
  basic: {
    title: 'Simple Typeahead',
    type: NgbxdTypeaheadBasic,
    code: require('!!raw-loader!./demos/basic/typeahead-basic'),
    markup: require('!!raw-loader!./demos/basic/typeahead-basic.html')
  },
  focus: {
    title: 'Open on focus',
    type: NgbxdTypeaheadFocus,
    code: require('!!raw-loader!./demos/focus/typeahead-focus'),
    markup: require('!!raw-loader!./demos/focus/typeahead-focus.html')
  },
  format: {
    title: 'Formatted results',
    type: NgbxdTypeaheadFormat,
    code: require('!!raw-loader!./demos/format/typeahead-format'),
    markup: require('!!raw-loader!./demos/format/typeahead-format.html')
  },
  http: {
    title: 'Wikipedia search',
    type: NgbxdTypeaheadHttp,
    code: require('!!raw-loader!./demos/http/typeahead-http'),
    markup: require('!!raw-loader!./demos/http/typeahead-http.html')
  },
  template: {
    title: 'Template for results',
    type: NgbxdTypeaheadTemplate,
    code: require('!!raw-loader!./demos/template/typeahead-template'),
    markup: require('!!raw-loader!./demos/template/typeahead-template.html')
  },
  config: {
    title: 'Global configuration of typeaheads',
    type: NgbxdTypeaheadConfig,
    code: require('!!raw-loader!./demos/config/typeahead-config'),
    markup: require('!!raw-loader!./demos/config/typeahead-config.html')
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
export class NgbxdTypeaheadModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('typeahead', DEMOS);
  }
}
