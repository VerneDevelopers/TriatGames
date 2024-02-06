import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrivialPage } from './trivial.page';

describe('TrivialPage', () => {
  let component: TrivialPage;
  let fixture: ComponentFixture<TrivialPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(TrivialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
