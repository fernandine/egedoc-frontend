import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderFavoriteComponent } from './folder-favorite.component';

describe('FolderFavoriteComponent', () => {
  let component: FolderFavoriteComponent;
  let fixture: ComponentFixture<FolderFavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolderFavoriteComponent]
    });
    fixture = TestBed.createComponent(FolderFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
