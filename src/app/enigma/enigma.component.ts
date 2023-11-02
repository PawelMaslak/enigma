import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service';
import { Rotor } from '../models/rotor';
import { KeyEventsService } from '../services/key-events.service';
import { RotorSection } from '../models/rotor-section';
import { Reflector } from '../models/reflector';
import { Plugboard } from '../models/plugboard';
import EnigmaHelper from '../helpers/enigma-helper';

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

  constructor(
    dataService: DataService,
    private keyEventsService: KeyEventsService) {
    this.setUpData(dataService);
    this.initialiseMachineComponents();
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
    this.rotorSection = new RotorSection([this.rotors[0], this.rotors[1], this.rotors[2]], this.reflectors[0]);
    return this.rotorSection;
  }

  private subscribeToKeyEventsService(): void {
    this.keyEventsService.keyPress$.subscribe(key => {
      console.log('Enigma component -> Captured key: ', key)
      this.processInput(key);
    });
  }

  public processInput(key: string): void {
    this.stepRotors();
    this.processKey(key); //Return string
    //Emit event!
    this.keyEventsService.emitProcessedKeyOutput(key);
  }

  getCurrentSetting() {
    console.log(this.rotorSection);
    console.log(this.plugboard);
  }

  private processKey(key: string): void {
    //Process letter through plugboard
    const letterPairs = this.plugboard.letterPairs;

    console.log(this.plugboard);
  }

  private processInputThroughPlugboard(key: string): string {
    const matchedPair = this.plugboard.letterPairs.find(
      pair => pair.letterOne.letter === key || pair.letterTwo.letter === key
    );

    if (matchedPair) {
      if (matchedPair.letterOne.letter === key) {
        return matchedPair.letterTwo.letter;
      } else {
        return matchedPair.letterOne.letter;
      }
    }

    return key;
  }

  private stepRotors(): void {
    const rotorOne = this.rotorSection.rotors[0];
    rotorOne.stepRotor(-1);
    if (rotorOne.currentPositionLetter == rotorOne.turnOverLetter) {
      const rotorTwo = this.rotorSection.rotors[1];
      rotorTwo.stepRotor(-1);
      if (rotorTwo.currentPositionLetter == rotorTwo.turnOverLetter) {
        const rotorThree = this.rotorSection.rotors[2];
        rotorThree.stepRotor(-1);
      }
    }
  }
}
