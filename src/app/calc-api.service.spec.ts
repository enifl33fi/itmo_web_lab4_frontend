import { TestBed } from '@angular/core/testing';

import { CalcApiService } from './calc-api.service';

describe('CalcApiService', () => {
  let service: CalcApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
