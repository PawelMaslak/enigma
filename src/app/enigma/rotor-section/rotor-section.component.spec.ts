import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotorSectionComponent } from './rotor-section.component';

describe('RotorSectionComponent', () => {
  let component: RotorSectionComponent;
  let fixture: ComponentFixture<RotorSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RotorSectionComponent]
    });
    fixture = TestBed.createComponent(RotorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
