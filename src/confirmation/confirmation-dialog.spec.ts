import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgbxConfirmationDialog} from './confirmation-dialog';

describe('NgbxConfirmationDialog', () => {
  let component: NgbxConfirmationDialog;
  let fixture: ComponentFixture<NgbxConfirmationDialog>;

  beforeEach(
      async(() => { TestBed.configureTestingModule({declarations: [NgbxConfirmationDialog]}).compileComponents(); }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbxConfirmationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
