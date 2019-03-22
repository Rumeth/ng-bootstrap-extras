import {Component, Directive, Injectable, Input, Output} from '@angular/core';

/**
 * Description
 *
 * @deprecated 2.0.0 description
 */
@Directive({
  selector: '[ngbxDirective]'
})
export class NgbxDirective {
  /**
   * Description
   *
   * @deprecated 2.0.0 description
   */
  @Input() input;

  /**
   * Description
   *
   * @deprecated 2.0.0 description
   */
  @Output() output;

  /**
   * Description
   *
   * @deprecated 2.0.0 description
   */
  property;

  /**
   * Description
   *
   * @deprecated 2.0.0 description
   */
  method() {}
}

/**
 * Description
 *
 * @deprecated 2.0.0 description
 */
@Component({
  selector: 'ngbx-component'
})
export class NgbxComponent {}


/**
 * Description
 *
 * @deprecated 2.0.0 description
 */
@Injectable()
export class NgbxService {}

/**
 * Description
 *
 * @deprecated 2.0.0 description
 */
export class NgbxClass {}

/**
 * Description
 *
 * @deprecated 2.0.0 description
 */
export interface NgbxInterface {
}
