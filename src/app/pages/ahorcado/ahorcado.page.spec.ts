import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AhorcadoPage } from './ahorcado.page';
import { IonicModule } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';

describe('AhorcadoPage', () => {
  let component: AhorcadoPage;
  let fixture: ComponentFixture<AhorcadoPage>;

  beforeEach((() => {
     TestBed.configureTestingModule({
      declarations: [AhorcadoPage],
      imports: [IonicModule.forRoot(),],
      providers: [
        { provide: AngularFirestore, useValue: {
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
        }},
        {provide: Firestore,useValue: {
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
        }}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AhorcadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
