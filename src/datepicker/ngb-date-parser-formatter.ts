import {padNumber, toInteger, isNumber} from '../util/util';
import {NgbxDateStruct} from './ngbx-date-struct';
import {Injectable} from '@angular/core';

export function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
  return new NgbxDateISOParserFormatter();
}

/**
 * Abstract type serving as a DI token for the service parsing and formatting dates for the NgbxInputDatepicker
 * directive. A default implementation using the ISO 8601 format is provided, but you can provide another implementation
 * to use an alternative format.
 */
@Injectable({providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY})
export abstract class NgbxDateParserFormatter {
  /**
   * Parses the given value to an NgbxDateStruct. Implementations should try their best to provide a result, even
   * partial. They must return null if the value can't be parsed.
   * @param value the value to parse
   */
  abstract parse(value: string): NgbxDateStruct;

  /**
   * Formats the given date to a string. Implementations should return an empty string if the given date is null,
   * and try their best to provide a partial result if the given date is incomplete or invalid.
   * @param date the date to format as a string
   */
  abstract format(date: NgbxDateStruct): string;
}

@Injectable()
export class NgbxDateISOParserFormatter extends NgbxDateParserFormatter {
  parse(value: string): NgbxDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return {year: toInteger(dateParts[0]), month: null, day: null};
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return {year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null};
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return {year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2])};
      }
    }
    return null;
  }

  format(date: NgbxDateStruct): string {
    return date ?
        `${date.year}-${isNumber(date.month) ? padNumber(date.month) : ''}-${isNumber(date.day) ? padNumber(date.day) : ''}` :
        '';
  }
}
