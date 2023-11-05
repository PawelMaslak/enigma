import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputKeyboardComponent } from './input-keyboard.component';

describe('InputKeyboardComponent', () => {
  let component: InputKeyboardComponent;
  let fixture: ComponentFixture<InputKeyboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputKeyboardComponent],
    });
    fixture = TestBed.createComponent(InputKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
