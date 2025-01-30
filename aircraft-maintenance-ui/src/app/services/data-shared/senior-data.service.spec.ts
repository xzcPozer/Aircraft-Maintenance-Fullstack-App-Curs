import { TestBed } from '@angular/core/testing';

import { SeniorDataService } from './senior-data.service';

describe('SeniorDataService', () => {
  let service: SeniorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeniorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
