import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AhorcadoPage } from './ahorcado.page';

describe('AhorcadoPage', () => {
  let component: AhorcadoPage;
  let fixture: ComponentFixture<AhorcadoPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(AhorcadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
