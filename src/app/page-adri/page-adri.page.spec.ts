import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageAdriPage } from './page-adri.page';

describe('PageAdriPage', () => {
  let component: PageAdriPage;
  let fixture: ComponentFixture<PageAdriPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PageAdriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
