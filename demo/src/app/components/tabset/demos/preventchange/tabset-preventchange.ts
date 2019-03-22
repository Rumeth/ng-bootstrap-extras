import {Component} from '@angular/core';
import {NgbxTabChangeEvent} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-tabset-preventchange',
  templateUrl: './tabset-preventchange.html'
})
export class NgbxdTabsetPreventchange {
    public beforeChange($event: NgbxTabChangeEvent) {
      if ($event.nextId === 'tab-preventchange2') {
        $event.preventDefault();
      }
    }
}
