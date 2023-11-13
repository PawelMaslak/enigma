import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Reflector } from 'src/app/models/reflector';
import { Rotor } from 'src/app/models/rotor';
import { RotorSection } from 'src/app/models/rotor-section';

@Component({
  selector: 'app-rotor-section',
  templateUrl: './rotor-section.component.html',
  styleUrls: ['./rotor-section.component.scss'],
})
export class RotorSectionComponent implements OnInit, OnChanges {
  @Input() rotorSection: RotorSection;

  public reflector: Reflector;
  public rotorOne: Rotor;
  public rotorThree: Rotor;
  public rotorTwo: Rotor;

  public getInfo(): void {
    console.log(this.rotorSection);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('rotorSection' in changes) {
      this.updateRotorSection(changes);
    }
  }

  ngOnInit(): void {
    this.rotorOne = this.rotorSection.rotors[0];
    this.rotorTwo = this.rotorSection.rotors[1];
    this.rotorThree = this.rotorSection.rotors[2];
    this.reflector = this.rotorSection.reflector;
  }

  private updateRotorSection(changes: SimpleChanges): void {
    const currentRotorChange = changes['rotorSection'];
    const updatedRotorSection = currentRotorChange.currentValue as RotorSection;
    const oldRotorSection = currentRotorChange.previousValue as RotorSection;

    this.rotorOne = updatedRotorSection.rotors[0];
    this.rotorTwo = updatedRotorSection.rotors[1];
    this.rotorThree = updatedRotorSection.rotors[2];
    this.reflector = updatedRotorSection.reflector;

    if (oldRotorSection.rotors[0].ringSettingVisible) {
      updatedRotorSection.rotors.forEach((rotor) => {
        rotor.ringSettingVisible = true;
      });
    }
  }
}
