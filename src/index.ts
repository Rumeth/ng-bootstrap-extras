import {NgModule, ModuleWithProviders} from '@angular/core';

import {NgbxAccordionModule} from './accordion/accordion.module';
import {NgbxAlertModule} from './alert/alert.module';
import {NgbxButtonsModule} from './buttons/buttons.module';
import {NgbxCarouselModule} from './carousel/carousel.module';
import {NgbxCollapseModule} from './collapse/collapse.module';
import {NgbxDatepickerModule} from './datepicker/datepicker.module';
import {NgbxDropdownModule} from './dropdown/dropdown.module';
import {NgbxModalModule} from './modal/modal.module';
import {NgbxPaginationModule} from './pagination/pagination.module';
import {NgbxPopoverModule} from './popover/popover.module';
import {NgbxProgressbarModule} from './progressbar/progressbar.module';
import {NgbxRatingModule} from './rating/rating.module';
import {NgbxTabsetModule} from './tabset/tabset.module';
import {NgbxTimepickerModule} from './timepicker/timepicker.module';
import {NgbxTooltipModule} from './tooltip/tooltip.module';
import {NgbxTypeaheadModule} from './typeahead/typeahead.module';

export {
  NgbxAccordionModule,
  NgbxPanelChangeEvent,
  NgbxAccordionConfig,
  NgbxAccordion,
  NgbxPanel,
  NgbxPanelTitle,
  NgbxPanelContent,
  NgbxPanelHeader,
  NgbxPanelHeaderContext,
  NgbxPanelToggle
} from './accordion/accordion.module';
export {NgbxAlertModule, NgbxAlertConfig, NgbxAlert} from './alert/alert.module';
export {NgbxButtonsModule, NgbxButtonLabel, NgbxCheckBox, NgbxRadio, NgbxRadioGroup} from './buttons/buttons.module';
export {NgbxCarouselModule, NgbxCarouselConfig, NgbxCarousel, NgbxSlide} from './carousel/carousel.module';
export {NgbxCollapseModule, NgbxCollapse} from './collapse/collapse.module';
export {
  NgbxCalendar,
  NgbxPeriod,
  NgbxCalendarIslamicCivil,
  NgbxCalendarIslamicUmalqura,
  NgbxCalendarHebrew,
  NgbxCalendarPersian,
  NgbxDatepickerModule,
  NgbxDatepickerI18n,
  NgbxDatepickerI18nHebrew,
  NgbxDatepickerConfig,
  NgbxDateStruct,
  NgbxDate,
  NgbxDateParserFormatter,
  NgbxDateAdapter,
  NgbxDateNativeAdapter,
  NgbxDateNativeUTCAdapter,
  NgbxDatepicker,
  NgbxInputDatepicker
} from './datepicker/datepicker.module';
export {
  NgbxDropdownModule,
  NgbxDropdownAnchor,
  NgbxDropdownConfig,
  NgbxDropdownItem,
  NgbxDropdownMenu,
  NgbxDropdownToggle,
  NgbxDropdown
} from './dropdown/dropdown.module';
export {
  NgbxModalModule,
  NgbxModal,
  NgbxModalConfig,
  NgbxModalOptions,
  NgbxActiveModal,
  NgbxModalRef,
  ModalDismissReasons
} from './modal/modal.module';
export {
  NgbxPaginationModule,
  NgbxPaginationConfig,
  NgbxPagination,
  NgbxPaginationEllipsis,
  NgbxPaginationFirst,
  NgbxPaginationLast,
  NgbxPaginationNext,
  NgbxPaginationNumber,
  NgbxPaginationPrevious
} from './pagination/pagination.module';
export {NgbxPopoverModule, NgbxPopoverConfig, NgbxPopover} from './popover/popover.module';
export {NgbxProgressbarModule, NgbxProgressbarConfig, NgbxProgressbar} from './progressbar/progressbar.module';
export {NgbxRatingModule, NgbxRatingConfig, NgbxRating} from './rating/rating.module';
export {
  NgbxTabsetModule,
  NgbxTabChangeEvent,
  NgbxTabsetConfig,
  NgbxTabset,
  NgbxTab,
  NgbxTabContent,
  NgbxTabTitle
} from './tabset/tabset.module';
export {
  NgbxTimepickerModule,
  NgbxTimepickerConfig,
  NgbxTimeStruct,
  NgbxTimepicker,
  NgbxTimeAdapter
} from './timepicker/timepicker.module';
export {NgbxTooltipModule, NgbxTooltipConfig, NgbxTooltip} from './tooltip/tooltip.module';
export {
  NgbxHighlight,
  NgbxTypeaheadModule,
  NgbxTypeaheadConfig,
  NgbxTypeaheadSelectItemEvent,
  NgbxTypeahead
} from './typeahead/typeahead.module';

export {Placement} from './util/positioning';

const NGB_MODULES = [
  NgbxAccordionModule, NgbxAlertModule, NgbxButtonsModule, NgbxCarouselModule, NgbxCollapseModule, NgbxDatepickerModule,
  NgbxDropdownModule, NgbxModalModule, NgbxPaginationModule, NgbxPopoverModule, NgbxProgressbarModule, NgbxRatingModule,
  NgbxTabsetModule, NgbxTimepickerModule, NgbxTooltipModule, NgbxTypeaheadModule
];

@NgModule({imports: NGB_MODULES, exports: NGB_MODULES})
export class NgbxModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxModule}; }
}
