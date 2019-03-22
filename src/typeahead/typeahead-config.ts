import {Injectable} from '@angular/core';
import {PlacementArray} from '../util/positioning';

/**
 * Configuration service for the NgbxTypeahead component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
@Injectable({providedIn: 'root'})
export class NgbxTypeaheadConfig {
  container;
  editable = true;
  focusFirst = true;
  showHint = false;
  placement: PlacementArray = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
}
