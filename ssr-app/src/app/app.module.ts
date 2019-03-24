import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbxModule } from 'ng-bootstrap-extras';

import { AccordionComponent } from './components/accordion.component';
import { AlertComponent } from './components/alert.component';
import { AppComponent } from './app.component';
import { ButtonsComponent } from './components/buttons.component';
import { CarouselComponent } from './components/carousel.component';
import { CollapseComponent } from './components/collapse.component';
import { DatepickerComponent } from './components/datepicker.component';
import { DropdownComponent } from './components/dropdown.component';
import { ConfirmationComponent } from './components/confirmation.component';
import { PaginationComponent } from './components/pagination.component';
import { PopoverComponent } from './components/popover.component';
import { ProgressComponent } from './components/progress.component';
import { RatingComponent } from './components/rating.component';
import { TabsetComponent } from './components/tabset.component';
import { TimepickerComponent } from './components/timepicker.component';
import { TooltipComponent } from './components/tooltip.component';
import { TypeaheadComponent } from './components/typeahead.component';

@NgModule({
  declarations: [
    AccordionComponent,
    AlertComponent,
    AppComponent,
    ButtonsComponent,
    CarouselComponent,
    CollapseComponent,
    DatepickerComponent,
    DropdownComponent,
    ConfirmationComponent,
    PaginationComponent,
    PopoverComponent,
    ProgressComponent,
    RatingComponent,
    TabsetComponent,
    TimepickerComponent,
    TooltipComponent,
    TypeaheadComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    NgbxModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
