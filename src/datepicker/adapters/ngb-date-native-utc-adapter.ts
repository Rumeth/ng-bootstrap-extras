import {Injectable} from '@angular/core';
import {NgbxDateStruct} from '../ngbx-date-struct';
import {NgbxDateNativeAdapter} from './ngbx-date-native-adapter';

/**
 * NgbxDateAdapter implementation that allows using native javascript UTC date as a user date model.
 * Same as NgbxDateNativeAdapter, but uses UTC dates.
 *
 * @since 3.2.0
 */
@Injectable()
export class NgbxDateNativeUTCAdapter extends NgbxDateNativeAdapter {
  protected _fromNativeDate(date: Date): NgbxDateStruct {
    return {year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate()};
  }

  protected _toNativeDate(date: NgbxDateStruct): Date {
    const jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
    // avoid 30 -> 1930 conversion
    jsDate.setUTCFullYear(date.year);
    return jsDate;
  }
}
