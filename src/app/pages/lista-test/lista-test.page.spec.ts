import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ListaTestPage } from './lista-test.page';

describe('ListaTestPage', () => {
  let component: ListaTestPage;
  let fixture: ComponentFixture<ListaTestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
