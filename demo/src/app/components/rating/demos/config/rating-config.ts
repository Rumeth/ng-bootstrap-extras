import {Component} from '@angular/core';
import {NgbxRatingConfig} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-rating-config',
  templateUrl: './rating-config.html',
  providers: [NgbxRatingConfig] // add NgbxRatingConfig to the component providers
})
export class NgbxdRatingConfig {
  constructor(config: NgbxRatingConfig) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;
  }
}
