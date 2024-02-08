import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from '@angular/fire/auth';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let service: AuthService;
  
  beforeEach((() => {
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
       
        }
      ]
    });
    service = TestBed.inject(AuthService);
  
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
