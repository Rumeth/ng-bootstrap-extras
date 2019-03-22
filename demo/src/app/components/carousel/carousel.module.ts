import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdCarouselBasic } from './demos/basic/carousel-basic';
import { NgbxdCarouselConfig } from './demos/config/carousel-config';
import { NgbxdCarouselNavigation } from './demos/navigation/carousel-navigation';

const DEMO_DIRECTIVES = [NgbxdCarouselBasic, NgbxdCarouselConfig, NgbxdCarouselNavigation];

const DEMOS = {
  basic: {
    title: 'Carousel',
    type: NgbxdCarouselBasic,
    code: require('!!raw-loader!./demos/basic/carousel-basic'),
    markup: require('!!raw-loader!./demos/basic/carousel-basic.html')
  },
  navigation: {
    title: 'Navigation arrows and indicators',
    type: NgbxdCarouselNavigation,
    code: require('!!raw-loader!./demos/navigation/carousel-navigation'),
    markup: require('!!raw-loader!./demos/navigation/carousel-navigation.html')
  },
  config: {
    title: 'Global configuration of carousels',
    type: NgbxdCarouselConfig,
    code: require('!!raw-loader!./demos/config/carousel-config'),
    markup: require('!!raw-loader!./demos/config/carousel-config.html')
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  { path: '',
    component: ComponentWrapper,
    children: [
      { path: 'examples', component: NgbxdExamplesPage },
      { path: 'api', component: NgbxdApiPage }
    ]
  }
];

@NgModule({
  imports: [NgbxdSharedModule, NgbxdComponentsSharedModule ],
  declarations: DEMO_DIRECTIVES,
  entryComponents: DEMO_DIRECTIVES
})
export class NgbxdCarouselModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('carousel', DEMOS);
  }
}
