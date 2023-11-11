import EnigmaHelper from '../helpers/enigma-helper';

export class Reflector {
  entryLetters: string[];
  guid: string;
  internalWiringLetters: string[];

  name: string;

  constructor(name: string, internalWiringLetters: string, guid: string) {
    this.name = name;
    this.guid = guid;
    this.internalWiringLetters = EnigmaHelper.getInternalWiringArray(internalWiringLetters);
    this.entryLetters = EnigmaHelper.getAlphabetArray();
  }
}
