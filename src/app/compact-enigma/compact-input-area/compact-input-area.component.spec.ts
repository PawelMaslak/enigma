import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactInputAreaComponent } from './compact-input-area.component';

describe('CompactInputAreaComponent', () => {
  let component: CompactInputAreaComponent;
  let fixture: ComponentFixture<CompactInputAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompactInputAreaComponent]
    });
    fixture = TestBed.createComponent(CompactInputAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
