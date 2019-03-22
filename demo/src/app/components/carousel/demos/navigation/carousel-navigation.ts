import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbxCarouselConfig } from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-carousel-navigation',
  templateUrl: './carousel-navigation.html',
  providers: [NgbxCarouselConfig]  // add NgbxCarouselConfig to the component providers
})
export class NgbxdCarouselNavigation {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(config: NgbxCarouselConfig, private _http: HttpClient) {
    // customize default values of carousels used by this component tree
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
  }
}
