import { Injectable } from '@angular/core';
import { Plugboard } from '../models/plugboard';
import { LetterPair, PlugboardLetter } from '../models/plugboardletter';

@Injectable({
  providedIn: 'root',
})
export class PlugboardService {
  public keyPairs: PlugboardLetter[] = [];
  public letterPairs: LetterPair[];
  public plugboard: Plugboard;
  private allowedPairsNumber: number;
  private colours: string[];

  private plugboardInitialised: boolean;

  public getLetterPairString(index: number): string {
    return `${this.letterPairs[index].letterPair}`;
  }

  public initPlugboard(plugboard: Plugboard): boolean {
    this.plugboard = plugboard;
    this.colours = this.plugboard.pairColours;
    this.allowedPairsNumber = this.plugboard.allowedPairsNumber;
    this.letterPairs = this.plugboard.letterPairs;

    if (!this.plugboardInitialised) {
      this.plugboardInitialised = true;
    }

    return true;
  }

  public letterPlugged(letter: string): boolean {
    return this.keyPairs.find((x) => x.letter === letter) != null;
  }

  public processKeySelect(plugboardLetter: PlugboardLetter): void {
    if (!this.canCreatePair(plugboardLetter)) {
      alert(`You cannot create more than ${this.allowedPairsNumber} letter pairs.`);
    } else {
      this.processInput(plugboardLetter);
    }
  }

  private addToKeyPairs(plugboardLetter: PlugboardLetter): void {
    this.keyPairs.push(plugboardLetter);
    plugboardLetter.togglePlug();
  }

  private allocateColour(letterPair: LetterPair, action: string): void {
    if (action === 'add') {
      const pickedColour = this.colours.shift();
      letterPair.pairColour = pickedColour;
      letterPair.letterOne.pairColour = pickedColour;
      letterPair.letterTwo.pairColour = pickedColour;
    } else {
      const pairColour = letterPair.pairColour;
      this.colours.push(pairColour);
      [letterPair, letterPair.letterOne, letterPair.letterTwo].forEach((item) => {
        item.pairColour = null;
      });
    }
  }

  private canCreatePair(plugboardLetter: PlugboardLetter): boolean {
    const newPairAllowed = this.letterPairs.length < this.allowedPairsNumber;
    return newPairAllowed || plugboardLetter.isPlugged;
  }

  private createLetterPair(): void {
    const indexOfLastLetter = this.getIndexOfLastItem(this.keyPairs);
    const letterOne = this.keyPairs[indexOfLastLetter - 1];
    const letterTwo = this.keyPairs[indexOfLastLetter];
    const letterPair = new LetterPair(letterOne, letterTwo);
    this.allocateColour(letterPair, 'add');
    this.letterPairs.push(letterPair);
  }

  private getIndexOfLastItem<T>(array: T[]): number {
    return array.length > 0 ? array.length - 1 : -1;
  }

  private isLetterInKeyPairs(plugboardLetter: PlugboardLetter): boolean {
    return this.keyPairs.some((keyPair) => keyPair.letter === plugboardLetter.letter);
  }

  private isPartOfLetterPair(plugboardLetter: PlugboardLetter): LetterPair {
    for (const letterPair of this.letterPairs) {
      if (letterPair.letterOne === plugboardLetter || letterPair.letterTwo === plugboardLetter) {
        return letterPair;
      }
    }
    return null;
  }

  private processInput(plugboardLetter: PlugboardLetter): void {
    if (this.isLetterInKeyPairs(plugboardLetter)) {
      const letterPair = this.isPartOfLetterPair(plugboardLetter);
      if (letterPair) {
        this.removeLetterPair(letterPair);
      } else {
        this.removeLetterFromKeyPairs(plugboardLetter);
      }
    } else {
      this.addToKeyPairs(plugboardLetter);
      if (this.keyPairs.length % 2 === 0) {
        this.createLetterPair();
      } else {
        plugboardLetter.pairColour = 'brown';
      }
    }
  }

  private removeItem(plugboardLetter: PlugboardLetter): void {
    const index = this.keyPairs.indexOf(plugboardLetter);
    if (index > -1) {
      this.keyPairs.splice(index, 1);
    }
  }

  private removeLetterFromKeyPairs(plugboardLetter: PlugboardLetter): void {
    plugboardLetter.togglePlug();
    this.removeItem(plugboardLetter);
  }

  private removeLetterPair(letterPair: LetterPair): void {
    letterPair.letterOne.togglePlug();
    letterPair.letterTwo.togglePlug();
    this.removeItem(letterPair.letterOne);
    this.removeItem(letterPair.letterTwo);
    this.letterPairs.splice(this.letterPairs.indexOf(letterPair), 1);
    this.allocateColour(letterPair, 'remove');
  }
}
