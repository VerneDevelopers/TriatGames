import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaAhorcadoPage } from './vista-ahorcado.page';

describe('VistaAhorcadoPage', () => {
  let component: VistaAhorcadoPage;
  let fixture: ComponentFixture<VistaAhorcadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VistaAhorcadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
