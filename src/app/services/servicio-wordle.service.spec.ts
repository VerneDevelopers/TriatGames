import { TestBed } from '@angular/core/testing';

import { ServicioWordleService } from './servicio-wordle.service';

describe('ServicioWordleService', () => {
  let service: ServicioWordleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioWordleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
