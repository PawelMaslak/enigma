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
  selectedRotor: Rotor;

  constructor(dataService: DataService) {
    this.rotors = dataService.GetRotorCollection();
    this.selectedRotor = this.rotors[0];
  }

  shift(i: number) {
    console.log('Moving number by ', i);
    this.selectedRotor.stepRotor(i);
  }

  shiftRing(i: number) {
    console.log('Shifting ring setting by ', i);
    this.selectedRotor.stepRingSetting(i);
  }
}
