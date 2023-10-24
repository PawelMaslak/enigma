import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service';
import { Rotor } from '../models/rotor';

@Component({
  selector: 'app-enigma',
  templateUrl: './enigma.component.html',
  styleUrls: ['./enigma.component.scss']
})
export class EnigmaComponent {
  rotors: Rotor[];
  rotorOne: Rotor;
  rotorTwo: Rotor;
  rotorThree: Rotor;

  constructor(dataService: DataService) {
    this.rotors = dataService.GetRotorCollection();
    this.rotorOne = this.rotors[0];
    this.rotorTwo = this.rotors[1];
    this.rotorThree = this.rotors[2];
  }
}
