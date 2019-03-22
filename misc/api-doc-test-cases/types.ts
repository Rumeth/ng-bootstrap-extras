import { Component, Directive, Injectable } from '@angular/core';

/**
 * Should be 'Directive'
 */
@Directive({
  selector: '[ngbxDirective]'
})
export class NgbxDirective {}

/**
 * Should be 'Component'
 */
@Component({
  selector: 'ngbx-component'
})
export class NgbxComponent {}


/**
 * Should be 'Service'
 */
@Injectable()
export class NgbxService {}

/**
 * Should be 'Class'
 */
export class NgbxClass {}

/**
 * Should be 'Interface'
 */
export interface NgbxInterface {}
