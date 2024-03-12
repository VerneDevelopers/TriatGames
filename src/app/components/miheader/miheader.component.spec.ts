import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiheaderComponent } from './miheader.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MiheaderComponent', () => {
  let component: MiheaderComponent;
  let fixture: ComponentFixture<MiheaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MiheaderComponent ],
      imports: [IonicModule.forRoot()],
      providers:[HttpClient,HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(MiheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
