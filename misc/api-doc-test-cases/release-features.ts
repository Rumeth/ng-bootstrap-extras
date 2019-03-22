import {Component, Directive, Injectable, Input, Output} from '@angular/core';

/**
 * Description
 *
 * @since 2.0.0
 */
@Directive({
  selector: '[ngbxDirective]'
})
export class NgbxDirective {
  /**
   * Description
   *
   * @since 2.0.0
   */
  @Input() input;

  /**
   * Description
   *
   * @since 2.0.0
   */
  @Output() output;

  /**
   * Description
   *
   * @since 2.0.0
   */
  property;

  /**
   * Description
   *
   * @since 2.0.0
   */
  method() {}
}

/**
 * Description
 *
 * @since 2.0.0
 */
@Component({
  selector: 'ngbx-component'
})
export class NgbxComponent {}


/**
 * Description
 *
 * @since 2.0.0
 */
@Injectable()
export class NgbxService {}

/**
 * Description
 *
 * @since 2.0.0
 */
export class NgbxClass {}

/**
 * Description
 *
 * @since 2.0.0
 */
export interface NgbxInterface {}
