import { Component } from '@angular/core';
import { NgbxCarouselConfig } from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-carousel-config',
  templateUrl: './carousel-config.html',
  providers: [NgbxCarouselConfig]  // add NgbxCarouselConfig to the component providers
})
export class NgbxdCarouselConfig {
  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(config: NgbxCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
}
