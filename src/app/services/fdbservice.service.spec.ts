import { TestBed } from '@angular/core/testing';

import { FDBServiceService } from './fdbservice.service';

describe('FDBServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FDBServiceService = TestBed.get(FDBServiceService);
    expect(service).toBeTruthy();
  });
});
