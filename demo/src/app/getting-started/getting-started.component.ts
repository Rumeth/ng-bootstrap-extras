import {Component} from '@angular/core';

@Component({
  selector: 'ngbxd-getting-started',
  templateUrl: './getting-started.component.html'
})
export class GettingStarted {

  codeInstall = `npm install --save ng-bootstrap-extras`;

  codeRoot = `
import {NgbxModule} from 'ng-bootstrap-extras';

@NgModule({
  ...
  imports: [NgbxModule, ...],
  ...
})
export class YourAppModule {
}`;

  codeOther = `
import {NgbxConfirmationModule} from 'ng-bootstrap-extras';

@NgModule({
  ...
  imports: [NgbxConfirmationModule, ...],
  ...
})
export class YourAppModule {
}`;

  codeSystem = `
map: {
  'ng-bootstrap-extras': 'node_modules/ng-bootstrap-extras/bundles/ng-bootstrap-extras.js',
}`;
}
