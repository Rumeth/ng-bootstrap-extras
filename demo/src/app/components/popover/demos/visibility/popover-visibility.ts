import {Component} from '@angular/core';

@Component({
  selector: 'ngbxd-popover-visibility',
  templateUrl: './popover-visibility.html'
})
export class NgbxdPopoverVisibility {
  lastShown: Date;
  lastHidden: Date;

  recordShown() {
    this.lastShown = new Date();
  }

  recordHidden() {
    this.lastHidden = new Date();
  }
}
