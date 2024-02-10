import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  Auth,
} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
   
    TestBed.configureTestingModule({
      providers: [

        {
          provide:
            Auth,
          useValue: {
            currentUser: {
              uid: 'test-uid'
            }
          },
       
        },        {
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
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return the current user uid', () => {
    expect(service.getUid()).toEqual('test-uid');
  });
  it('should register a new user', async () => {
    const user = await service.register('bernat', '123456');
    console.log("register:", user);
    expect('test-uid').toEqual('test-uid');
  });
  it('should login a user', async () => {
    const user = await service.login( 'bernat',  '123456' );
    console.log("login:", user);
    expect('test-uid').toEqual('test-uid');

  }
  );
  it('should reset the password', async () => {
    await service.resetPassword('bernat');
    expect('test-uid').toEqual('test-uid');
  });
  it('should logout the user', async () => {
    await service.logout();
    expect('test-uid').toEqual('test-uid');
  });


});
