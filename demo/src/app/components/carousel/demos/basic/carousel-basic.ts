import { Component } from '@angular/core';

@Component({selector: 'ngbxd-carousel-basic', templateUrl: './carousel-basic.html'})
export class NgbxdCarouselBasic {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
}
