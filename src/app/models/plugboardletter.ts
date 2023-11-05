import EnigmaHelper from '../helpers/enigma-helper';

export class PlugboardLetter {
  isPlugged: boolean;
  letter: string;
  letterNumber: number;

  pairColour?: string;
  pluggedLetter: string;

  constructor(letter: string) {
    this.letter = letter;
    this.isPlugged = false;
    this.pluggedLetter = letter;
    this.letterNumber = EnigmaHelper.getLetterNumberInAlphabet(letter);
  }

  public togglePlug(): void {
    this.isPlugged = !this.isPlugged;
  }
}

export class LetterPair {
  letterOne: PlugboardLetter;
  letterPair: string;
  letterTwo: PlugboardLetter;

  pairColour?: string;

  constructor(letterOne: PlugboardLetter, letterTwo: PlugboardLetter) {
    this.letterOne = letterOne;
    this.letterTwo = letterTwo;
    this.letterPair = `${letterOne.letter}${letterTwo.letter}`;
  }
}
