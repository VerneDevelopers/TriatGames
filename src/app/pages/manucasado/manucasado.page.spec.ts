import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManucasadoPage } from './manucasado.page';

describe('ManucasadoPage', () => {
  let component: ManucasadoPage;
  let fixture: ComponentFixture<ManucasadoPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(ManucasadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
