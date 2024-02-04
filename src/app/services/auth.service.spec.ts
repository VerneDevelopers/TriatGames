import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  Auth,
  AuthModule
} from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [  AuthModule,
        { provide: Auth, useValue: {
          currentUser: { uid: 'test-uid',
          email: 'bernat@gmail.com'},
          signInWithEmailAndPassword: () => Promise.resolve({ uid: 'test-uid' }),
          createUserWithEmailAndPassword: () => Promise.resolve({ uid: 'test-uid' }),
          signOut: () => Promise.resolve(),
          sendPasswordResetEmail: () => Promise.resolve()
                  
        } }
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
    const user = await service.register('bernat','123456');
    console.log(user);
    expect('test-uid').toEqual('test-uid');
  } );
  it('should login a user', async () => {
    const user = await service.login  
    ({ email: 'bernat', password: '123456' });
    console.log(user);
    expect('test-uid').toEqual('test-uid');
  }
  );



});
