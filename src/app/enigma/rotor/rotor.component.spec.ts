import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotorComponent } from './rotor.component';

describe('RotorComponent', () => {
  let component: RotorComponent;
  let fixture: ComponentFixture<RotorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RotorComponent],
    });
    fixture = TestBed.createComponent(RotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
