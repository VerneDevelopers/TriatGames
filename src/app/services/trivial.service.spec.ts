import { TestBed } from '@angular/core/testing';

import { TrivialService } from './trivial.service';

describe('TrivialService', () => {
  let service: TrivialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrivialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
