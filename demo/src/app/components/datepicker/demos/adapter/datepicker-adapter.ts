import {Component, Injectable} from '@angular/core';
import {NgbxDateAdapter, NgbxDateStruct, NgbxDateNativeAdapter} from 'ng-bootstrap-extras';

@Component({
  selector: 'ngbxd-datepicker-adapter',
  templateUrl: './datepicker-adapter.html',

  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will want to provide your main App Module
  providers: [{provide: NgbxDateAdapter, useClass: NgbxDateNativeAdapter}]
})
export class NgbxdDatepickerAdapter {

  model1: Date;
  model2: Date;

  get today() {
    return new Date();
  }
}
