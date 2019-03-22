import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdTableBasic } from './demos/basic/table-basic';
import { NgbxdSortableHeader as NgbxdSortableHeader1, NgbxdTableSortable } from './demos/sortable/table-sortable';
import { NgbxdTableFiltering } from './demos/filtering/table-filtering';
import { NgbxdTablePagination } from './demos/pagination/table-pagination';
import { NgbxdTableComplete } from './demos/complete/table-complete';
import { NgbxdSortableHeader as NgbxdSortableHeader2 } from './demos/complete/sortable.directive';
import { NgbxdTableOverviewComponent } from './overview/table-overview.component';
import { NgbxdTableOverviewDemo } from './overview/demo/table-overview-demo.component';

const DEMO_DIRECTIVES = [
  NgbxdTableBasic, NgbxdTableSortable, NgbxdTableFiltering, NgbxdTablePagination, NgbxdTableComplete
];

const OVERVIEW = {
  'why-not': 'Why not?',
  'examples': 'Code examples'
};

const DEMOS = {
  basic: {
    title: 'Basic table',
    type: NgbxdTableBasic,
    code: require('!!raw-loader!./demos/basic/table-basic'),
    markup: require('!!raw-loader!./demos/basic/table-basic.html')
  },
  sortable: {
    title: 'Sortable table',
    type: NgbxdTableSortable,
    code: require('!!raw-loader!./demos/sortable/table-sortable'),
    markup: require('!!raw-loader!./demos/sortable/table-sortable.html')
  },
  filtering: {
    title: 'Search and filtering',
    type: NgbxdTableFiltering,
    code: require('!!raw-loader!./demos/filtering/table-filtering'),
    markup: require('!!raw-loader!./demos/filtering/table-filtering.html')
  },
  pagination: {
    title: 'Pagination',
    type: NgbxdTablePagination,
    code: require('!!raw-loader!./demos/pagination/table-pagination'),
    markup: require('!!raw-loader!./demos/pagination/table-pagination.html')
  },
  complete: {
    title: 'Complete example',
    type: NgbxdTableComplete,
    code: require('!!raw-loader!./demos/complete/table-complete'),
    markup: require('!!raw-loader!./demos/complete/table-complete.html')
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: '',
    component: ComponentWrapper,
    data: { OVERVIEW },
    children: [
      { path: 'overview', component: NgbxdTableOverviewComponent },
      { path: 'examples', component: NgbxdExamplesPage }
    ]
  }
];

@NgModule({
  imports: [
    NgbxdSharedModule,
    NgbxdComponentsSharedModule
  ],
  declarations: [
    DEMO_DIRECTIVES,
    NgbxdSortableHeader1,
    NgbxdSortableHeader2,
    NgbxdTableOverviewComponent,
    NgbxdTableOverviewDemo
  ],
  entryComponents: DEMO_DIRECTIVES
})
export class NgbxdTableModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('table', DEMOS, OVERVIEW);
  }
}
