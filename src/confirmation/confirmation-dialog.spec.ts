import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbxConfirmationConfig } from './confirmation-config';

import {NgbxConfirmationDialog} from './confirmation-dialog';

describe('NgbxConfirmationDialog', () => {
  let component: NgbxConfirmationDialog;
  let fixture: ComponentFixture<NgbxConfirmationDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [NgbxConfirmationDialog], providers: [NgbActiveModal]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbxConfirmationDialog);
    component = fixture.componentInstance;
    component.ngbxConfirmationOptions = new NgbxConfirmationConfig();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
