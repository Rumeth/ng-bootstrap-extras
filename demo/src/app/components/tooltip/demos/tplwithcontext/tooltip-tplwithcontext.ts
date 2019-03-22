import {Component} from '@angular/core';

@Component({
  selector: 'ngbxd-tooltip-tplwithcontext',
  templateUrl: './tooltip-tplwithcontext.html'
})
export class NgbxdTooltipTplwithcontext {
  name = 'World';

  toggleWithGreeting(tooltip, greeting: string) {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({greeting});
    }
  }
}
