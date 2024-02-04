import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordlePage } from './wordle.page';

describe('WordlePage', () => {
  let component: WordlePage;
  let fixture: ComponentFixture<WordlePage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(WordlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
