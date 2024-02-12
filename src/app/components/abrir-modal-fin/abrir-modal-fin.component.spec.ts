import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';

import { AbrirModalFinComponent } from './abrir-modal-fin.component';

describe('AbrirModalFinComponent', () => {
  let component: AbrirModalFinComponent;
  let fixture: ComponentFixture<AbrirModalFinComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(
      {
      declarations: [ AbrirModalFinComponent ],
      imports: [IonicModule.forRoot(),
        
      ],
      providers: [
        {
          provide: IonRouterOutlet,
          useValue: {
            nativeEl: "",
           
          }
        }]
    }).compileComponents();

    fixture = TestBed.createComponent(AbrirModalFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
