import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PabloPage } from './pablo.page';

describe('PabloPage', () => {
  let component: PabloPage;
  let fixture: ComponentFixture<PabloPage>;

   beforeEach( => {
     fixture = TestBed.createComponent(PabloPage);
     component = fixture.componentInstance;
     fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
