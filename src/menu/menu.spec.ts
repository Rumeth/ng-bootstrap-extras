import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbxMenu } from './menu';

describe('NgbxMenu', () => {
  let component: NgbxMenu;
  let fixture: ComponentFixture<NgbxMenu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbxMenu ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbxMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
