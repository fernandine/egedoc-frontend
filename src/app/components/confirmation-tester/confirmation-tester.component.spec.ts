import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationTesterComponent } from './confirmation-tester.component';

describe('ConfirmationTesterComponent', () => {
  let component: ConfirmationTesterComponent;
  let fixture: ComponentFixture<ConfirmationTesterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationTesterComponent]
    });
    fixture = TestBed.createComponent(ConfirmationTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
