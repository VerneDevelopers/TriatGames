import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OscarPage } from './oscar.page';

describe('OscarPage', () => {
  let component: OscarPage;
  let fixture: ComponentFixture<OscarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OscarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
