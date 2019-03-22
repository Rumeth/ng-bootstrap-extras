import {Component} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'ngbxd-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent {
  public version: string = environment.version;
}
