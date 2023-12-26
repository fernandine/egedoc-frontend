import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPropertiesComponent } from './document-properties.component';

describe('DocumentPropertiesComponent', () => {
  let component: DocumentPropertiesComponent;
  let fixture: ComponentFixture<DocumentPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentPropertiesComponent]
    });
    fixture = TestBed.createComponent(DocumentPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
