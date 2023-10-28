import { Component, OnInit } from '@angular/core';
import EnigmaHelper from 'src/app/helpers/enigma-helper';
import { LetterPair, PlugboardLetter } from 'src/app/models/plugboardletter';

@Component({
  selector: 'app-plugboard',
  templateUrl: './plugboard.component.html',
  styleUrls: ['./plugboard.component.scss']
})
export class PlugboardComponent {
  private plugboardLetters: PlugboardLetter[] = EnigmaHelper.getPlugboardLetters();
  firstRow: PlugboardLetter[] = this.plugboardLetters.slice(0, 9);
  secondRow: PlugboardLetter[] = this.plugboardLetters.slice(9, 17);
  thirdRow: PlugboardLetter[] = this.plugboardLetters.slice(17, 26);
  keyPairs: PlugboardLetter[] = [];
  letterPairs: LetterPair[] = [];
  allowedPairsNumber: number = 10;
  colours: string[] = EnigmaHelper.getColourList();

  public getLetterPairString(index: number): string {
    return `${this.letterPairs[index].letterPair}`;
  }

  public letterPlugged(letter: string): boolean {
    return this.keyPairs.find(x => x.letter === letter) != null;
  }

  //Allow for pair removal when there are already 10 pairs
  public pairKey(plugboardLetter: PlugboardLetter): void {
    if (!this.canCreatePair(plugboardLetter)) {
      alert(`You cannot create more than ${this.allowedPairsNumber} letter pairs.`);
    }
    else {
      this.processInput(plugboardLetter);
    }
  }

  private addToKeyPairs(plugboardLetter: PlugboardLetter): void {
    this.keyPairs.push(plugboardLetter);
    plugboardLetter.togglePlug();
  }

  private allocateColour(letterPair: LetterPair, action: string): void {
    if (action === "add") {
      const pickedColour = this.colours.shift();
      letterPair.pairColour = pickedColour;
      letterPair.letterOne.pairColour = pickedColour;
      letterPair.letterTwo.pairColour = pickedColour;
    }
    else {
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

  //Some checks condition and returns boolean for any element of the array.
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

  private removeItem(plugboardLetter: PlugboardLetter): void {
    const index = this.keyPairs.indexOf(plugboardLetter);
    if (index > -1) {
      this.keyPairs.splice(index, 1);
    }
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
