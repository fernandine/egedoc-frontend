import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryFreeComponent } from './try-free.component';

describe('TryFreeComponent', () => {
  let component: TryFreeComponent;
  let fixture: ComponentFixture<TryFreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TryFreeComponent]
    });
    fixture = TestBed.createComponent(TryFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
