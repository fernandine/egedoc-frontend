import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelComponent } from './painel.component';

describe('PainelComponent', () => {
  let component: PainelComponent;
  let fixture: ComponentFixture<PainelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PainelComponent]
});
    fixture = TestBed.createComponent(PainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
