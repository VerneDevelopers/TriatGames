import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
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
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
