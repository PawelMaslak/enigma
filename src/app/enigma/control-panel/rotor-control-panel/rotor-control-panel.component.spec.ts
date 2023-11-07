import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotorControlPanelComponent } from './rotor-control-panel.component';

describe('RotorControlPanelComponent', () => {
  let component: RotorControlPanelComponent;
  let fixture: ComponentFixture<RotorControlPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RotorControlPanelComponent]
    });
    fixture = TestBed.createComponent(RotorControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
