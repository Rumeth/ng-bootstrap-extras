import {TestBed} from '@angular/core/testing';

import {NgbxModalBackdrop} from './modal-backdrop';

describe('ngbx-modal-backdrop', () => {

  beforeEach(() => { TestBed.configureTestingModule({declarations: [NgbxModalBackdrop]}); });

  it('should render backdrop with required CSS classes', () => {
    const fixture = TestBed.createComponent(NgbxModalBackdrop);

    fixture.detectChanges();
    expect(fixture.nativeElement).toHaveCssClass('modal-backdrop');
  });
});
