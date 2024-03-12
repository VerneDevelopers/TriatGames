import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuntuacionesPage } from './puntuaciones.page';

describe('PuntuacionesPage', () => {
  let component: PuntuacionesPage;
  let fixture: ComponentFixture<PuntuacionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PuntuacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
