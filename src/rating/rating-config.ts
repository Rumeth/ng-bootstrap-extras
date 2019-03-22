import {Injectable} from '@angular/core';

/**
 * Configuration service for the NgbxRating component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ratings used in the application.
 */
@Injectable({providedIn: 'root'})
export class NgbxRatingConfig {
  max = 10;
  readonly = false;
  resettable = false;
}
