import { TestBed } from '@angular/core/testing';

import { WordleService } from './wordle.service';
import { Firestore } from '@angular/fire/firestore';

describe('ServicioWordleService', () => {
  let service: WordleService;

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
    service = TestBed.inject(WordleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
