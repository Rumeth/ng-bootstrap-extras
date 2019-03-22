import {Injectable} from '@angular/core';
import {NgbxDateAdapter} from './ngbx-date-adapter';
import {NgbxDateStruct} from '../ngbx-date-struct';
import {isInteger} from '../../util/util';

/**
* NgbxDateAdapter implementation that allows using native javascript date as a user date model.
 */
@Injectable()
export class NgbxDateNativeAdapter extends NgbxDateAdapter<Date> {
  /**
   * Converts native date to a NgbxDateStruct
   */
  fromModel(date: Date): NgbxDateStruct {
    return (date instanceof Date && !isNaN(date.getTime())) ? this._fromNativeDate(date) : null;
  }

  /**
   * Converts a NgbxDateStruct to a native date
   */
  toModel(date: NgbxDateStruct): Date {
    return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) ? this._toNativeDate(date) :
                                                                                          null;
  }

  protected _fromNativeDate(date: Date): NgbxDateStruct {
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
  }

  protected _toNativeDate(date: NgbxDateStruct): Date {
    const jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // avoid 30 -> 1930 conversion
    jsDate.setFullYear(date.year);
    return jsDate;
  }
}
