import EnigmaHelper from "../helpers/enigma-helper";

export class Rotor {
    id: number;
    name: string;
    ringSetting: number;
    currentPositionLetter: string;
    turnOverLetter: string;
    entryLetters: string[];
    internalWiringLetters: string[];
    alphabetArray: string[];
    ringSettingNumbersArray: number[];

    constructor
        (
            id: number,
            name: string,
            turnOverLetter: string,
            internalWiringLetters: string
        ) {
        this.id = id;
        this.name = name;
        this.ringSetting = 1;
        this.currentPositionLetter = "A";
        this.turnOverLetter = turnOverLetter;
        this.entryLetters = EnigmaHelper.getAlphabetArray();
        this.internalWiringLetters = EnigmaHelper.getInternalWiringArray(internalWiringLetters);
        this.alphabetArray = EnigmaHelper.getAlphabetArray();
        this.ringSettingNumbersArray = EnigmaHelper.getRingSettingsNumberArray();
    }

    public stepRotor(step: number) {
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
    
    stepRingSetting(index: number) {
        const alphabetLength = this.entryLetters.length;
        const shiftedRingSettingNumbersArray = new Array(alphabetLength);
        const shiftedInternalWiring = new Array(alphabetLength);
    
        for (let i = 0; i < alphabetLength; i++) {
            const currentCharacter = this.internalWiringLetters[i];
            const currentCharacterIndex = this.alphabetArray.indexOf(currentCharacter);
    
            const shiftedCharacterIndex = (currentCharacterIndex + index + alphabetLength) % alphabetLength;
            const idx = (i + index + alphabetLength) % alphabetLength;
    
            shiftedInternalWiring[idx] = this.alphabetArray[shiftedCharacterIndex];
            shiftedRingSettingNumbersArray[i] = this.ringSettingNumbersArray[idx];
        }
    
        this.internalWiringLetters = shiftedInternalWiring;
        this.ringSettingNumbersArray = shiftedRingSettingNumbersArray;
        this.ringSetting = shiftedRingSettingNumbersArray[0];
    }
}