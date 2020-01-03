import { TestBed } from '@angular/core/testing';

import { CpcResultsArrayService } from './cpc-results-array.service';

describe('CpcResultsArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CpcResultsArrayService = TestBed.get(CpcResultsArrayService);
    expect(service).toBeTruthy();
  });
});
