import EnigmaHelper from '../helpers/enigma-helper';
import { LetterPair, PlugboardLetter } from './plugboardletter';

export class Plugboard {
  allowedPairsNumber: number = 10;
  letterPairs: LetterPair[] = [];
  pairColours: string[];
  plugboardLetters: PlugboardLetter[];

  constructor() {
    this.plugboardLetters = EnigmaHelper.getPlugboardLetters();
    this.pairColours = EnigmaHelper.getColourList();
  }
}
