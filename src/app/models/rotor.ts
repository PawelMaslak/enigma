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
}