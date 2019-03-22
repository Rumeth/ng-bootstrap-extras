import {Component, Injectable} from '@angular/core';
import {NgbxTimeStruct, NgbxTimeAdapter} from 'ng-bootstrap-extras';

/**
 * Example of a String Time adapter
 */
@Injectable()
export class NgbxTimeStringAdapter extends NgbxTimeAdapter<string> {

  fromModel(value: string): NgbxTimeStruct {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbxTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}

@Component({
  selector: 'ngbxd-timepicker-adapter',
  templateUrl: './timepicker-adapter.html',
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will want to provide your main App Module
  providers: [{provide: NgbxTimeAdapter, useClass: NgbxTimeStringAdapter}]
})
export class NgbxdTimepickerAdapter {
  time: '13:30:00';
}
