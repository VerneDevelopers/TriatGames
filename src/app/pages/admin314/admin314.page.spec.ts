import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Admin314Page } from './admin314.page';

describe('Admin314Page', () => {
  let component: Admin314Page;
  let fixture: ComponentFixture<Admin314Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Admin314Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
