import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactEnigmaComponent } from './compact-enigma.component';

describe('CompactEnigmaComponent', () => {
  let component: CompactEnigmaComponent;
  let fixture: ComponentFixture<CompactEnigmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompactEnigmaComponent]
    });
    fixture = TestBed.createComponent(CompactEnigmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
