import { TestBed } from '@angular/core/testing';

import { AlertApiService } from './alert-api.service';

describe('AlertApiService', () => {
  let service: AlertApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
