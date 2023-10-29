import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service';
import { Rotor } from '../models/rotor';
import { KeyEventsService } from '../services/key-events.service';
import { RotorSection } from '../models/rotor-section';
import { Reflector } from '../models/reflector';
import { Plugboard } from '../models/plugboard';

@Component({
  selector: 'app-enigma',
  templateUrl: './enigma.component.html',
  styleUrls: ['./enigma.component.scss']
})
export class EnigmaComponent {
  plugboard: Plugboard;
  rotorSection: RotorSection;

  rotors: Rotor[];
  reflectors: Reflector[];


  rotorOne: Rotor;
  rotorTwo: Rotor;
  rotorThree: Rotor;

  constructor(
    dataService: DataService,
    private keyEventsService: KeyEventsService) {
    this.setUpData(dataService);
    this.initialiseMachineComponents();




    this.rotorOne = this.rotors[0];
    this.rotorTwo = this.rotors[1];
    this.rotorThree = this.rotors[2];
  }

  ngOnInit(): void {
    this.subscribeToKeyEventsService();
  }

  private setUpData(dataService: DataService): void {
    this.rotors = dataService.GetRotorCollection();
    this.reflectors = dataService.GetReflectorCollection();
  }

  private initialiseMachineComponents(): void {
    this.plugboard = new Plugboard();
    this.rotorSection = this.createDefaultRotorSection();
  }

  //In the future - allow user to manually select components of rotor section
  private createDefaultRotorSection(): RotorSection {
    return new RotorSection([this.rotorOne, this.rotorTwo, this.rotorThree], this.reflectors[0]);
  }

  private subscribeToKeyEventsService(): void {
    this.keyEventsService.keyPress$.subscribe(key => {
      console.log('Enigma component -> Captured key: ', key)
      this.processInput(key);
    });
  }

  public processInput(key: string) {
    //Capture input
    //Process input in plugboard
    //Send signal to ETW


    console.log('Stepping the rotor by one:');
    this.rotorOne.stepRotor(-1);
    console.log(this.plugboard);
  }

  getCurrentSetting() {
    console.log(this.rotorOne);
    console.log(this.rotorTwo);
    console.log(this.rotorThree);
  }
}
