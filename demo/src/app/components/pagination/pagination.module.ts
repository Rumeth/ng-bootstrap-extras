import {NgModule} from '@angular/core';

import {NgbxdSharedModule} from '../../shared';
import {ComponentWrapper} from '../../shared/component-wrapper/component-wrapper.component';
import {NgbxdComponentsSharedModule, NgbxdDemoList} from '../shared';
import {NgbxdApiPage} from '../shared/api-page/api.component';
import {NgbxdExamplesPage} from '../shared/examples-page/examples.component';
import {NgbxdPaginationAdvanced} from './demos/advanced/pagination-advanced';
import {NgbxdPaginationBasic} from './demos/basic/pagination-basic';
import {NgbxdPaginationConfig} from './demos/config/pagination-config';
import {NgbxdPaginationDisabled} from './demos/disabled/pagination-disabled';
import {NgbxdPaginationJustify} from './demos/justify/pagination-justify';
import {NgbxdPaginationSize} from './demos/size/pagination-size';
import {NgbxdPaginationOverviewComponent} from './overview/pagination-overview.component';
import {NgbxdPaginationCustomization} from './demos/customization/pagination-customization';

const DEMO_DIRECTIVES = [
  NgbxdPaginationAdvanced,
  NgbxdPaginationBasic,
  NgbxdPaginationSize,
  NgbxdPaginationConfig,
  NgbxdPaginationCustomization,
  NgbxdPaginationDisabled,
  NgbxdPaginationJustify,
];

const OVERVIEW = {
  'basic-usage': 'Basic Usage',
  'customization': 'Customization',
};

const DEMOS = {
  basic: {
    title: 'Basic pagination',
    type: NgbxdPaginationBasic,
    code: require('!!raw-loader!./demos/basic/pagination-basic'),
    markup: require('!!raw-loader!./demos/basic/pagination-basic.html')
  },
  advanced: {
    title: 'Advanced pagination',
    type: NgbxdPaginationAdvanced,
    code: require('!!raw-loader!./demos/advanced/pagination-advanced'),
    markup: require('!!raw-loader!./demos/advanced/pagination-advanced.html')
  },
  customization: {
    title: 'Custom links',
    type: NgbxdPaginationCustomization,
    code: require('!!raw-loader!./demos/customization/pagination-customization'),
    markup: require('!!raw-loader!./demos/customization/pagination-customization.html')
  },
  size: {
    title: 'Pagination size',
    type: NgbxdPaginationSize,
    code: require('!!raw-loader!./demos/size/pagination-size'),
    markup: require('!!raw-loader!./demos/size/pagination-size.html')
  },
  justify: {
    title: 'Pagination alignment',
    type: NgbxdPaginationJustify,
    code: require('!!raw-loader!./demos/justify/pagination-justify'),
    markup: require('!!raw-loader!./demos/justify/pagination-justify.html')
  },
  disabled: {
    title: 'Disabled pagination',
    type: NgbxdPaginationDisabled,
    code: require('!!raw-loader!./demos/disabled/pagination-disabled'),
    markup: require('!!raw-loader!./demos/disabled/pagination-disabled.html')
  },
  config: {
    title: 'Global configuration',
    type: NgbxdPaginationConfig,
    code: require('!!raw-loader!./demos/config/pagination-config'),
    markup: require('!!raw-loader!./demos/config/pagination-config.html')
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: '',
    component: ComponentWrapper,
    data: { OVERVIEW },
    children: [
      { path: 'overview', component: NgbxdPaginationOverviewComponent },
      { path: 'examples', component: NgbxdExamplesPage },
      { path: 'api', component: NgbxdApiPage }
    ]
  }
];

@NgModule({
  imports: [NgbxdSharedModule, NgbxdComponentsSharedModule],
  declarations: [...DEMO_DIRECTIVES, NgbxdPaginationOverviewComponent],
  entryComponents: DEMO_DIRECTIVES
})
export class NgbxdPaginationModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('pagination', DEMOS, OVERVIEW);
  }
}
