import {Directive, Input} from '@angular/core';

/**
 * The NgbxCollapse directive provides a simple way to hide and show an element with animations.
 */
@Directive({
  selector: '[ngbxCollapse]',
  exportAs: 'ngbxCollapse',
  host: {'[class.collapse]': 'true', '[class.show]': '!collapsed'}
})
export class NgbxCollapse {
  /**
   * A flag indicating collapsed (true) or open (false) state.
   */
  @Input('ngbxCollapse') collapsed = false;
}
