import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessListModalComponent } from './access-list-modal.component';

describe('AccessListModalComponent', () => {
  let component: AccessListModalComponent;
  let fixture: ComponentFixture<AccessListModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessListModalComponent]
    });
    fixture = TestBed.createComponent(AccessListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
