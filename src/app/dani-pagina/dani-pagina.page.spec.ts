import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DaniPaginaPage } from './dani-pagina.page';

describe('DaniPaginaPage', () => {
  let component: DaniPaginaPage;
  let fixture: ComponentFixture<DaniPaginaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DaniPaginaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
