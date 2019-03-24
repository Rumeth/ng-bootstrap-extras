import {TestBed} from '@angular/core/testing';

import {NgbxConfirmation} from './confirmation';

describe('NgbxConfirmation', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgbxConfirmation = TestBed.get(NgbxConfirmation);
    expect(service).toBeTruthy();
  });
});
