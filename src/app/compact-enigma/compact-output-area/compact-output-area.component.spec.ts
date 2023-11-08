import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactOutputAreaComponent } from './compact-output-area.component';

describe('CompactOutputAreaComponent', () => {
  let component: CompactOutputAreaComponent;
  let fixture: ComponentFixture<CompactOutputAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompactOutputAreaComponent],
    });
    fixture = TestBed.createComponent(CompactOutputAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
