import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPlatformComponent } from './header-platform.component';

describe('HeaderPlatformComponent', () => {
  let component: HeaderPlatformComponent;
  let fixture: ComponentFixture<HeaderPlatformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HeaderPlatformComponent]
});
    fixture = TestBed.createComponent(HeaderPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
