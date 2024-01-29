import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BernatPage } from './bernat.page';

describe('BernatPage', () => {
  let component: BernatPage;
  let fixture: ComponentFixture<BernatPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(BernatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
