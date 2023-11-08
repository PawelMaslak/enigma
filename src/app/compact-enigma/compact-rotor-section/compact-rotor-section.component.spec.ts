import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactRotorSectionComponent } from './compact-rotor-section.component';

describe('CompactRotorSectionComponent', () => {
  let component: CompactRotorSectionComponent;
  let fixture: ComponentFixture<CompactRotorSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompactRotorSectionComponent],
    });
    fixture = TestBed.createComponent(CompactRotorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
