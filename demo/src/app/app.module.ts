import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbxModule } from 'ng-bootstrap-extras';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { NgbxdAccordionModule } from './components/accordion/accordion.module';
import { NgbxdAlertModule } from './components/alert/alert.module';
import { NgbxdButtonsModule } from './components/buttons/buttons.module';
import { NgbxdCarouselModule } from './components/carousel/carousel.module';
import { NgbxdCollapseModule } from './components/collapse/collapse.module';
import { NgbxdDatepickerModule } from './components/datepicker/datepicker.module';
import { NgbxdDropdownModule } from './components/dropdown/dropdown.module';
import { NgbxdModalModule } from './components/modal/modal.module';
import { NgbxdPaginationModule } from './components/pagination/pagination.module';
import { NgbxdPopoverModule } from './components/popover/popover.module';
import { NgbxdProgressbarModule } from './components/progressbar/progressbar.module';
import { NgbxdRatingModule } from './components/rating/rating.module';
import { NgbxdTableModule } from './components/table/table.module';
import { NgbxdTabsetModule } from './components/tabset/tabset.module';
import { NgbxdTimepickerModule } from './components/timepicker/timepicker.module';
import { NgbxdTooltipModule } from './components/tooltip/tooltip.module';
import { NgbxdTypeaheadModule } from './components/typeahead/typeahead.module';
import { DefaultComponent } from './default';
import { GettingStarted } from './getting-started';
import { NgbxdSharedModule } from './shared';

const DEMOS = [
  NgbxdAccordionModule,
  NgbxdAlertModule,
  NgbxdButtonsModule,
  NgbxdCarouselModule,
  NgbxdCollapseModule,
  NgbxdDatepickerModule,
  NgbxdDropdownModule,
  NgbxdModalModule,
  NgbxdPaginationModule,
  NgbxdPopoverModule,
  NgbxdProgressbarModule,
  NgbxdRatingModule,
  NgbxdTableModule,
  NgbxdTabsetModule,
  NgbxdTimepickerModule,
  NgbxdTooltipModule,
  NgbxdTypeaheadModule
];

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    GettingStarted
  ],
  imports: [
    BrowserModule,
    routing,
    NgbModule,
    NgbxModule,
    NgbxdSharedModule,
    ...DEMOS
  ],
  bootstrap: [AppComponent]
})
export class NgbxdModule {
}
