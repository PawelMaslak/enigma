import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Plugboard } from 'src/app/models/plugboard';
import { LetterPair, PlugboardLetter } from 'src/app/models/plugboardletter';

@Component({
  selector: 'app-plugboard',
  templateUrl: './plugboard.component.html',
  styleUrls: ['./plugboard.component.scss'],
})

//The problem here is that we use separate arrays for the plugboard parts which then are not updated when we load config.
//TODO: Remove keyPairs and letterPairs properties so all we bound to plugboard.
export class PlugboardComponent implements OnInit, OnChanges {
  @Input() plugboard: Plugboard;

  firstRow: PlugboardLetter[];
  //letterPairs: LetterPair[];
  secondRow: PlugboardLetter[];
  thirdRow: PlugboardLetter[];
  private allowedPairsNumber: number;
  private colours: string[];
  constructor(private toastr: ToastrService) {}

  //private keyPairs: PlugboardLetter[] = []; //Missing

  public getLetterPairString(index: number): string {
    return `${this.plugboard.letterPairs[index].letterPair}`;
  }

  public letterPlugged(letter: string): boolean {
    return this.plugboard.keyPairs.find((x) => x.letter === letter) != null;
  }

  //Add method to check if the plugboard has been different from previous version when calling method.
  ngOnChanges(changes: SimpleChanges): void {
    if ('plugboard' in changes) {
      const updatedPlugboard = changes['plugboard'].currentValue as Plugboard;

      this.plugboard = updatedPlugboard;

      //To separate method:
      this.firstRow = this.plugboard.plugboardLetters.slice(0, 9);
      this.secondRow = this.plugboard.plugboardLetters.slice(9, 17);
      this.thirdRow = this.plugboard.plugboardLetters.slice(17, 26);
      this.colours = this.plugboard.pairColours;
      this.allowedPairsNumber = this.plugboard.allowedPairsNumber;
    }
  }

  ngOnInit(): void {
    //To separate method:
    this.firstRow = this.plugboard.plugboardLetters.slice(0, 9);
    this.secondRow = this.plugboard.plugboardLetters.slice(9, 17);
    this.thirdRow = this.plugboard.plugboardLetters.slice(17, 26);
    this.colours = this.plugboard.pairColours;
    this.allowedPairsNumber = this.plugboard.allowedPairsNumber;
  }

  public pairKey(plugboardLetter: PlugboardLetter): void {
    this.processKeySelect(plugboardLetter);
  }

  public processKeySelect(plugboardLetter: PlugboardLetter): void {
    if (!this.canCreatePair(plugboardLetter)) {
      this.toastr.error(`You cannot create more than ${this.allowedPairsNumber} letter pairs.`, 'Plugboard Error');
    } else {
      this.processInput(plugboardLetter);
    }
  }

  private addToKeyPairs(plugboardLetter: PlugboardLetter): void {
    this.plugboard.keyPairs.push(plugboardLetter);
    plugboardLetter.togglePlug();
  }

  private allocateColour(letterPair: LetterPair, action: string): void {
    if (action === 'add') {
      const pickedColour = this.colours.shift();
      letterPair.pairColour = pickedColour;
      letterPair.letterOne.pairColour = pickedColour;
      letterPair.letterTwo.pairColour = pickedColour;
    } else {
      const pairColour = letterPair.pairColour; //Pick colour from one of the items.
      this.colours.push(pairColour);
      [letterPair, letterPair.letterOne, letterPair.letterTwo].forEach((item) => {
        item.pairColour = null;
      });

      const plugboardLetterCollectionLetterOne = this.plugboard.plugboardLetters.find(
        (letter) => letter.letter === letterPair.letterOne.letter,
      );

      if (plugboardLetterCollectionLetterOne.isPlugged) {
        plugboardLetterCollectionLetterOne.togglePlug();
        plugboardLetterCollectionLetterOne.pairColour = null;
      }

      const plugboardLetterCollectionLetterTwo = this.plugboard.plugboardLetters.find(
        (letter) => letter.letter === letterPair.letterTwo.letter,
      );

      if (plugboardLetterCollectionLetterTwo.isPlugged) {
        plugboardLetterCollectionLetterTwo.togglePlug();
        plugboardLetterCollectionLetterTwo.pairColour = null;
      }
    }
  }

  private canCreatePair(plugboardLetter: PlugboardLetter): boolean {
    const newPairAllowed = this.plugboard.letterPairs.length < this.allowedPairsNumber;
    return newPairAllowed || plugboardLetter.isPlugged;
  }

  private createLetterPair(): void {
    const indexOfLastLetter = this.getIndexOfLastItem(this.plugboard.keyPairs);
    const letterOne = this.plugboard.keyPairs[indexOfLastLetter - 1];
    const letterTwo = this.plugboard.keyPairs[indexOfLastLetter];
    const letterPair = new LetterPair(letterOne, letterTwo);
    this.allocateColour(letterPair, 'add');
    this.plugboard.letterPairs.push(letterPair);
  }

  private getIndexOfLastItem<T>(array: T[]): number {
    return array.length > 0 ? array.length - 1 : -1;
  }

  private isLetterInKeyPairs(plugboardLetter: PlugboardLetter): boolean {
    return this.plugboard.keyPairs.some((keyPair) => keyPair.letter === plugboardLetter.letter);
  }

  private isPartOfLetterPair(plugboardLetter: PlugboardLetter): LetterPair {
    for (const letterPair of this.plugboard.letterPairs) {
      if (
        letterPair.letterOne.letter === plugboardLetter.letter ||
        letterPair.letterTwo.letter === plugboardLetter.letter
      ) {
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
      if (this.plugboard.keyPairs.length % 2 === 0) {
        this.createLetterPair();
      } else {
        plugboardLetter.pairColour = 'brown';
      }
    }
  }

  private removeItem(plugboardLetter: PlugboardLetter): void {
    const letterInKeyPairs = this.plugboard.keyPairs.find((letter) => letter.letter === plugboardLetter.letter);
    const index = this.plugboard.keyPairs.indexOf(letterInKeyPairs);
    if (index > -1) {
      this.plugboard.keyPairs.splice(index, 1);
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
    this.plugboard.letterPairs.splice(this.plugboard.letterPairs.indexOf(letterPair), 1);
    this.allocateColour(letterPair, 'remove');
  }
}
