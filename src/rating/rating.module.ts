import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbxRating} from './rating';

export {NgbxRating} from './rating';
export {NgbxRatingConfig} from './rating-config';

@NgModule({declarations: [NgbxRating], exports: [NgbxRating], imports: [CommonModule]})
export class NgbxRatingModule {
  /**
   * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
   * Will be removed in 4.0.0.
   *
   * @deprecated 3.0.0
   */
  static forRoot(): ModuleWithProviders { return {ngModule: NgbxRatingModule}; }
}
