import EnigmaHelper from '../helpers/enigma-helper';

export class Rotor {
  alphabetArray: string[];
  currentPositionLetter: string;
  entryLetters: string[];
  id: number;

  internalWiringLetters: string[];
  name: string;

  ringSetting: number;

  ringSettingNumbersArray: number[];
  ringSettingVisible: boolean;
  turnOverLetter: string;

  constructor(id: number, name: string, turnOverLetter: string, internalWiringLetters: string) {
    this.id = id;
    this.name = name;
    this.ringSetting = 1;
    this.currentPositionLetter = 'A';
    this.turnOverLetter = turnOverLetter;
    this.entryLetters = EnigmaHelper.getAlphabetArray();
    this.internalWiringLetters = EnigmaHelper.getInternalWiringArray(internalWiringLetters);
    this.alphabetArray = EnigmaHelper.getAlphabetArray();
    this.ringSettingNumbersArray = EnigmaHelper.getRingSettingsNumberArray();
  }

  stepRingSetting(index: number): void {
    const alphabetLength = this.entryLetters.length;
    const shiftedRingSettingNumbersArray = new Array(alphabetLength);
    const shiftedInternalWiring = new Array(alphabetLength);

    for (let i = 0; i < alphabetLength; i++) {
      const currentLetter = this.internalWiringLetters[i];
      const currentLetterIndex = this.alphabetArray.indexOf(currentLetter);

      const shiftedLetterIndex = (currentLetterIndex + index + alphabetLength) % alphabetLength;
      const indexInShiftedLettersArray = (i + index + alphabetLength) % alphabetLength;

      shiftedInternalWiring[indexInShiftedLettersArray] = this.alphabetArray[shiftedLetterIndex];
      shiftedRingSettingNumbersArray[i] = this.ringSettingNumbersArray[indexInShiftedLettersArray];
    }

    this.internalWiringLetters = shiftedInternalWiring;
    this.ringSettingNumbersArray = shiftedRingSettingNumbersArray;
    this.ringSetting = shiftedRingSettingNumbersArray[0];
  }

  public stepRotor(step: number): void {
    const alphabetLength = 26;
    const shiftedEntryCharacters = new Array(alphabetLength);
    const shiftedInternalWiring = new Array(alphabetLength);

    for (let i = 0; i < alphabetLength; i++) {
      const sourceIndex = i + step;
      const targetIndex = (sourceIndex + alphabetLength) % alphabetLength;

      shiftedEntryCharacters[targetIndex] = this.entryLetters[i];
      shiftedInternalWiring[targetIndex] = this.internalWiringLetters[i];
    }

    this.internalWiringLetters = shiftedInternalWiring;
    this.entryLetters = shiftedEntryCharacters;
    this.currentPositionLetter = this.entryLetters[0];
  }
}
