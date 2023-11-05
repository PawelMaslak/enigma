import EnigmaHelper from '../helpers/enigma-helper';

export class Reflector {
  entryLetters: string[];
  internalWiringLetters: string[];
  name: string;

  constructor(name: string, internalWiringLetters: string) {
    this.name = name;
    this.internalWiringLetters = EnigmaHelper.getInternalWiringArray(internalWiringLetters);
    this.entryLetters = EnigmaHelper.getAlphabetArray();
  }
}
