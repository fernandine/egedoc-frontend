import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionsComponent } from './solutions.component';

describe('SolutionsComponent', () => {
  let component: SolutionsComponent;
  let fixture: ComponentFixture<SolutionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SolutionsComponent]
});
    fixture = TestBed.createComponent(SolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
