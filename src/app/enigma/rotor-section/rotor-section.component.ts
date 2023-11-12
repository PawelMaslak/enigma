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

  reflector: Reflector;
  rotorOne: Rotor;
  rotorThree: Rotor;
  rotorTwo: Rotor;

  public getInfo(): void {
    console.log(this.rotorSection);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('rotorSection' in changes) {
      const currentRotorChange = changes['rotorSection'];
      const rotorSection = currentRotorChange.currentValue as RotorSection;
      this.rotorOne = rotorSection.rotors[0];
      this.rotorTwo = rotorSection.rotors[1];
      this.rotorThree = rotorSection.rotors[2];
      this.reflector = rotorSection.reflector;
    }
  }

  ngOnInit(): void {
    this.rotorOne = this.rotorSection.rotors[0];
    this.rotorTwo = this.rotorSection.rotors[1];
    this.rotorThree = this.rotorSection.rotors[2];
    this.reflector = this.rotorSection.reflector;
  }
}
