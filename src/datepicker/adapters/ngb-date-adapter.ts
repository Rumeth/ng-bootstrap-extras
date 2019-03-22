import {Injectable} from '@angular/core';
import {NgbxDateStruct} from '../ngbx-date-struct';
import {isInteger} from '../../util/util';

export function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
  return new NgbxDateStructAdapter();
}

/**
 * An abstract class used as the DI token that does conversion between the internal
 * datepicker NgbxDateStruct model and any provided user date model, ex. string, native date, etc.
 *
 * Adapter is used for conversion when binding datepicker to a model with forms, ex. [(ngModel)]="userDateModel"
 *
 * Default implementation assumes NgbxDateStruct for user model as well.
 */
@Injectable({providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY})
export abstract class NgbxDateAdapter<D> {
  /**
   * Converts user-model date into an NgbxDateStruct for internal use in the library
   */
  abstract fromModel(value: D): NgbxDateStruct;

  /**
   * Converts internal date value NgbxDateStruct to user-model date
   * The returned type is supposed to be of the same type as fromModel() input-value param
   */
  abstract toModel(date: NgbxDateStruct): D;
}

@Injectable()
export class NgbxDateStructAdapter extends NgbxDateAdapter<NgbxDateStruct> {
  /**
   * Converts a NgbxDateStruct value into NgbxDateStruct value
   */
  fromModel(date: NgbxDateStruct): NgbxDateStruct {
    return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
        {year: date.year, month: date.month, day: date.day} :
        null;
  }

  /**
   * Converts a NgbxDateStruct value into NgbxDateStruct value
   */
  toModel(date: NgbxDateStruct): NgbxDateStruct {
    return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
        {year: date.year, month: date.month, day: date.day} :
        null;
  }
}
