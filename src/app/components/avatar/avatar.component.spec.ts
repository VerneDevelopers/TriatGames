import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarComponent } from './avatar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
  
      declarations: [ AvatarComponent ],
      imports: [IonicModule.forRoot()],
      providers:[HttpClient,HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
