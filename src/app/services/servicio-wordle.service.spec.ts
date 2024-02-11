import { TestBed } from '@angular/core/testing';

import { ServicioWordleService } from './servicio-wordle.service';
import { Firestore } from '@angular/fire/firestore';

describe('ServicioWordleService', () => {
  let service: ServicioWordleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Firestore,
          useValue: {
            collection: () => {
              return {
                valueChanges: () => {
                  return {
                    subscribe: () => {
                      return {
                        unsubscribe: () => {
                          return;
                        }
                      };
                    }
                  };
                }
              };
            }
          }
        }
      ]
    });
    service = TestBed.inject(ServicioWordleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
