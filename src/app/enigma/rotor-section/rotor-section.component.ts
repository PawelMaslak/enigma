import { Component, Input, OnInit } from '@angular/core';
import { Reflector } from 'src/app/models/reflector';
import { Rotor } from 'src/app/models/rotor';
import { RotorSection } from 'src/app/models/rotor-section';

@Component({
  selector: 'app-rotor-section',
  templateUrl: './rotor-section.component.html',
  styleUrls: ['./rotor-section.component.scss']
})
export class RotorSectionComponent implements OnInit {
  @Input() rotorSection: RotorSection;

  rotorOne: Rotor;
  rotorTwo: Rotor;
  rotorThree: Rotor;
  reflector: Reflector;

  ngOnInit(): void {
    this.rotorOne = this.rotorSection.rotors[0];
    this.rotorTwo = this.rotorSection.rotors[1];
    this.rotorThree = this.rotorSection.rotors[2];
    this.reflector = this.rotorSection.reflector;
    console.log(this.rotorSection);
  }
}
