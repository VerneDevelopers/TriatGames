import { TestBed } from '@angular/core/testing';

import { TrivialService } from './trivial.service';
import { AngularFireModule } from '@angular/fire/compat';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('TrivialService', () => {
  let service: TrivialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        DatePipe,
        {
          provide: AngularFireModule,
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
        },
        {
          provide: AngularFirestore,
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
    service = TestBed.inject(TrivialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
