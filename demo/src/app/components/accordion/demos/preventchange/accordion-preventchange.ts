import {Component} from '@angular/core';
import {NgbxPanelChangeEvent} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-accordion-preventchange',
  templateUrl: './accordion-preventchange.html',
})
export class NgbxdAccordionPreventchange {
  public beforeChange($event: NgbxPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }
}
