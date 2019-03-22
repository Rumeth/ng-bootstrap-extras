import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngbxd-buttons-checkboxreactive',
  templateUrl: './buttons-checkboxreactive.html'
})
export class NgbxdButtonsCheckboxreactive {
  public checkboxGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.checkboxGroupForm = this.formBuilder.group({
      left: true,
      middle: false,
      right: false
    });
  }
}
