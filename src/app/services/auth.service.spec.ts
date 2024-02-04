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
          currentUser: { uid: 'test-uid' },
        
        } }
      ]
      
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
