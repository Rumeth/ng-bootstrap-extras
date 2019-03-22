import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { NgbxdApiDocs, NgbxdApiDocsBadge, NgbxdApiDocsClass, NgbxdApiDocsConfig } from './api-docs';
import { NgbxdApiPage } from './api-page/api.component';
import { NgbxdWidgetDemoComponent } from './examples-page/demo.component';
import { NgbxdExamplesPage } from './examples-page/examples.component';
import { NgbxdFragment } from './fragment';
import { NgbxdOverviewDirective, NgbxdOverviewSectionComponent } from './overview';

export * from './demo-list';

@NgModule({
  imports: [NgbxdSharedModule],
  declarations: [
    NgbxdApiDocsBadge,
    NgbxdApiDocs,
    NgbxdApiDocsClass,
    NgbxdApiDocsConfig,
    NgbxdFragment,
    NgbxdOverviewDirective,
    NgbxdOverviewSectionComponent,
    NgbxdExamplesPage,
    NgbxdApiPage,
    NgbxdWidgetDemoComponent
  ],
  exports: [
    NgbxdApiDocsBadge,
    NgbxdApiDocs,
    NgbxdApiDocsClass,
    NgbxdApiDocsConfig,
    NgbxdFragment,
    NgbxdOverviewDirective,
    NgbxdOverviewSectionComponent,
    NgbxdExamplesPage,
    NgbxdApiPage,
    NgbxdWidgetDemoComponent
  ]
})
export class NgbxdComponentsSharedModule {}
