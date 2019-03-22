import {Injectable} from '@angular/core';
import {NgbxTimeStruct} from './ngbx-time-struct';
import {isInteger} from '../util/util';

export function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
  return new NgbxTimeStructAdapter();
}

/**
 * Abstract type serving as a DI token for the service converting from your application Time model to internal
 * NgbxTimeStruct model.
 * A default implementation converting from and to NgbxTimeStruct is provided for retro-compatibility,
 * but you can provide another implementation to use an alternative format, ie for using with native Date Object.
 *
 * @since 2.2.0
 */
@Injectable({providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY})
export abstract class NgbxTimeAdapter<T> {
  /**
   * Converts user-model date into an NgbxTimeStruct for internal use in the library
   */
  abstract fromModel(value: T): NgbxTimeStruct;

  /**
   * Converts internal time value NgbxTimeStruct to user-model date
   * The returned type is supposed to be of the same type as fromModel() input-value param
   */
  abstract toModel(time: NgbxTimeStruct): T;
}

@Injectable()
export class NgbxTimeStructAdapter extends NgbxTimeAdapter<NgbxTimeStruct> {
  /**
   * Converts a NgbxTimeStruct value into NgbxTimeStruct value
   */
  fromModel(time: NgbxTimeStruct): NgbxTimeStruct {
    return (time && isInteger(time.hour) && isInteger(time.minute)) ?
        {hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null} :
        null;
  }

  /**
   * Converts a NgbxTimeStruct value into NgbxTimeStruct value
   */
  toModel(time: NgbxTimeStruct): NgbxTimeStruct {
    return (time && isInteger(time.hour) && isInteger(time.minute)) ?
        {hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null} :
        null;
  }
}
