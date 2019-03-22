import { NgModule } from '@angular/core';

import { NgbxdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbxdComponentsSharedModule, NgbxdDemoList } from '../shared';
import { NgbxdApiPage } from '../shared/api-page/api.component';
import { NgbxdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbxdButtonsCheckbox } from './demos/checkbox/buttons-checkbox';
import { NgbxdButtonsCheckboxreactive } from './demos/checkboxreactive/buttons-checkboxreactive';
import { NgbxdButtonsRadio } from './demos/radio/buttons-radio';
import { NgbxdButtonsRadioreactive } from './demos/radioreactive/buttons-radioreactive';

const DEMO_DIRECTIVES = [NgbxdButtonsCheckbox, NgbxdButtonsCheckboxreactive, NgbxdButtonsRadio, NgbxdButtonsRadioreactive];

const DEMOS = {
  checkbox: {
    title: 'Checkbox buttons',
    type: NgbxdButtonsCheckbox,
    code: require('!!raw-loader!./demos/checkbox/buttons-checkbox'),
    markup: require('!!raw-loader!./demos/checkbox/buttons-checkbox.html')
  },
  checkboxreactive: {
    title: 'Checkbox buttons (Reactive Forms)',
    type: NgbxdButtonsCheckboxreactive,
    code: require('!!raw-loader!./demos/checkboxreactive/buttons-checkboxreactive'),
    markup: require('!!raw-loader!./demos/checkboxreactive/buttons-checkboxreactive.html')
  },
  radio: {
    title: 'Radio buttons',
    type: NgbxdButtonsRadio,
    code: require('!!raw-loader!./demos/radio/buttons-radio'),
    markup: require('!!raw-loader!./demos/radio/buttons-radio.html')
  },
  radioreactive: {
    title: 'Radio buttons (Reactive Forms)',
    type: NgbxdButtonsRadioreactive,
    code: require('!!raw-loader!./demos/radioreactive/buttons-radioreactive'),
    markup: require('!!raw-loader!./demos/radioreactive/buttons-radioreactive.html')
  }};

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
export class NgbxdButtonsModule {
  constructor(demoList: NgbxdDemoList) {
    demoList.register('buttons', DEMOS);
  }
}
