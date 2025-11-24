import { TestBed } from '@angular/core/testing';

import { SouteanceService } from './soutenance-service';

describe('SouteanceService', () => {
  let service: SouteanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SouteanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
