import { Component, OnInit } from '@angular/core';
import EnigmaHelper from '../helpers/enigma-helper';
import { Plugboard } from '../models/plugboard';
import { Reflector } from '../models/reflector';
import { Rotor } from '../models/rotor';
import { RotorSection } from '../models/rotor-section';
import { DataService } from '../services/data-service';
import { KeyEventsService } from '../services/key-events.service';

@Component({
  selector: 'app-enigma',
  templateUrl: './enigma.component.html',
  styleUrls: ['./enigma.component.scss'],
})
export class EnigmaComponent implements OnInit {
  alphabet: string[];
  public compactEnigmaVisible: boolean;
  plugboard: Plugboard;
  reflectors: Reflector[];
  rotors: Rotor[];
  rotorSection: RotorSection;

  constructor(
    dataService: DataService,
    private keyEventsService: KeyEventsService,
  ) {
    this.setUpData(dataService);
    this.initialiseMachineComponents();
  }

  public getCurrentSetting(): void {
    console.log(this.rotorSection);
    console.log(this.plugboard);
  }

  public getEnigmaToggleButtonText(): string {
    return this.compactEnigmaVisible ? 'Show Classic Enigma' : 'Show Compact Enigma';
  }

  ngOnInit(): void {
    this.subscribeToKeyEventsService();
  }

  public processInput(key: string): void {
    this.stepRotors();
    const outputLetter = this.processKey(key); //Return string
    this.keyEventsService.emitProcessedKeyOutput(outputLetter);
  }

  public toggleEnigmaButton(): void {
    this.compactEnigmaVisible = !this.compactEnigmaVisible;
  }

  //In the future - allow user to manually select components of rotor section
  private createDefaultRotorSection(): RotorSection {
    this.rotorSection = new RotorSection([this.rotors[0], this.rotors[1], this.rotors[2]], this.reflectors[0]);
    return this.rotorSection;
  }

  private initialiseMachineComponents(): void {
    this.plugboard = new Plugboard();
    this.rotorSection = this.createDefaultRotorSection();
  }

  private isToBeTurnedOver(rotor: Rotor): boolean {
    const turnOverLetterIndex = rotor.alphabetArray.indexOf(rotor.turnOverLetter) + 1;
    const currentLetter = rotor.alphabetArray.indexOf(rotor.currentPositionLetter);

    console.log(`Current letter index: ${currentLetter}. Turnover index: ${turnOverLetterIndex}`);

    return turnOverLetterIndex === currentLetter;
  }

  private processCharacterThroughUkw(key: string, index: number): string {
    const thirdRotorOutputLetterIndex = this.rotorSection.rotors[index].entryLetters.indexOf(key);

    const reflector = this.rotorSection.reflector;
    const ukwInputCharacter = reflector.entryLetters[thirdRotorOutputLetterIndex];
    const ukwOutputCharacter = reflector.internalWiringLetters[thirdRotorOutputLetterIndex];

    //This is for monitoring purposes only for development.
    console.log(
      `Processed letter through UKW ${
        reflector.name
      }. Input: ${ukwInputCharacter}, Output: ${ukwOutputCharacter}. Rotor number: ${index + 1}`,
    );

    return ukwOutputCharacter;
  }

  private processInputThroughPlugboard(key: string): string {
    const matchedPair = this.plugboard.letterPairs.find(
      (pair) => pair.letterOne.letter === key || pair.letterTwo.letter === key,
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

  private processInputThroughRotor(key: string, index: number): string {
    const inputLetterIndex =
      index === 0 ? this.alphabet.indexOf(key) : this.rotorSection.rotors[index - 1].entryLetters.indexOf(key);

    const selectedRotor = this.rotorSection.rotors[index];
    const rotorInputCharacter = selectedRotor.entryLetters[inputLetterIndex];
    const rotorOutputCharacter = selectedRotor.internalWiringLetters[inputLetterIndex];
    const rotorName = selectedRotor.name;

    //This is for monitoring purposes only for development.
    console.log(
      `Processed letter through Rotor ${rotorName}. Input: ${rotorInputCharacter}, Output: ${rotorOutputCharacter}. Rotor number: ${
        index + 1
      }`,
    );

    return rotorOutputCharacter;
  }

  private processInputThroughRotors(key: string): string {
    let processingKey = key;

    //Coming letter processing
    for (let rotorIndex = 0; rotorIndex < this.rotorSection.rotors.length; rotorIndex++) {
      processingKey = this.processInputThroughRotor(processingKey, rotorIndex);
    }
    //UKW
    const lastRotorIndex = this.rotorSection.rotors.length - 1;
    processingKey = this.processCharacterThroughUkw(processingKey, lastRotorIndex);
    //Exiting letter procesing
    for (let rotorIndex = this.rotorSection.rotors.length - 1; rotorIndex >= 0; rotorIndex--) {
      processingKey = this.processReturnCharacterThroughRotor(processingKey, rotorIndex);
    }

    return processingKey;
  }

  private processKey(key: string): string {
    const plugboardEntryLetterOutput = this.processInputThroughPlugboard(key);
    const rotorsOutput = this.processInputThroughRotors(plugboardEntryLetterOutput);
    const etwOutput = this.processReturnCharacterThroughEtw(rotorsOutput);
    const plugboardReturnLetterOutput = this.processInputThroughPlugboard(etwOutput);

    return plugboardReturnLetterOutput;
  }

  private processReturnCharacterThroughEtw(key: string): string {
    const firstRotorReturnedLetterIndex = this.rotorSection.rotors[0].entryLetters.indexOf(key);
    const etwReturnLetter = this.alphabet[firstRotorReturnedLetterIndex];

    console.log(`Processed letter through ETW. Input: ${key}, Output: ${etwReturnLetter}.`);

    return etwReturnLetter;
  }

  private processReturnCharacterThroughRotor(key: string, index: number): string {
    const rotorMaxIndex = this.rotorSection.rotors.length - 1;
    const inputLetterIndex =
      index === rotorMaxIndex
        ? this.rotorSection.reflector.entryLetters.indexOf(key)
        : this.rotorSection.rotors[index + 1].entryLetters.indexOf(key);

    const selectedRotor = this.rotorSection.rotors[index];
    const selectedRotorInputCharacter = selectedRotor.entryLetters[inputLetterIndex];
    const selectedRotorInternalWiringInputCharacterIndex =
      selectedRotor.internalWiringLetters.indexOf(selectedRotorInputCharacter);
    const selectedRotorOutputCharacter = selectedRotor.entryLetters[selectedRotorInternalWiringInputCharacterIndex];

    //This is for monitoring purposes only for development.
    console.log(
      `Processed letter through Rotor ${selectedRotor.name}. Input: ${selectedRotorInputCharacter}, Output: ${selectedRotorOutputCharacter}. Rotor number: ${index}`,
    );

    return selectedRotorOutputCharacter;
  }

  private setUpData(dataService: DataService): void {
    this.rotors = dataService.GetRotorCollection();
    this.reflectors = dataService.GetReflectorCollection();
    this.alphabet = EnigmaHelper.getAlphabetArray();
  }

  private stepRotors(): void {
    const rotorOne = this.rotorSection.rotors[0];
    rotorOne.stepRotor(-1);
    if (this.isToBeTurnedOver(rotorOne)) {
      const rotorTwo = this.rotorSection.rotors[1];
      rotorTwo.stepRotor(-1);
      if (this.isToBeTurnedOver(rotorTwo)) {
        const rotorThree = this.rotorSection.rotors[2];
        rotorThree.stepRotor(-1);
      }
    }
  }

  private subscribeToKeyEventsService(): void {
    this.keyEventsService.keyPress$.subscribe((key) => {
      console.log('Enigma component -> Captured key: ', key);
      this.processInput(key);
    });
  }
}
