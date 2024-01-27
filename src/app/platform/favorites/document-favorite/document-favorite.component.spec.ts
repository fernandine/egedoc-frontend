import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFavoriteComponent } from './document-favorite.component';

describe('DocumentFavoriteComponent', () => {
  let component: DocumentFavoriteComponent;
  let fixture: ComponentFixture<DocumentFavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentFavoriteComponent]
    });
    fixture = TestBed.createComponent(DocumentFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
