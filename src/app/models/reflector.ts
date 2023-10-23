import EnigmaHelper from "../helpers/enigma-helper";

export class Reflector {
    name: string;
    internalWiringLetters: string[];
    entryLetters: string[];

    constructor(
        name: string,
        internalWiringLetters: string
    ) {
        this.name = name;
        this.internalWiringLetters = EnigmaHelper.getInternalWiringArray(internalWiringLetters);
        this.entryLetters = EnigmaHelper.getAlphabetArray();
    }
}