import EnigmaHelper from "../helpers/enigma-helper";

export class PlugboardLetter {
    letter: string;
    letterNumber: number;
    isPlugged: boolean;
    pluggedLetter: string;
    pairColour?: string;

    constructor(
        letter: string
    ) {
        this.letter = letter;
        this.isPlugged = false;
        this.pluggedLetter = '';
        this.letterNumber = EnigmaHelper.getLetterNumberInAlphabet(letter);
    }

    public togglePlug(): void {
        this.isPlugged = !this.isPlugged;
    }
}

export class LetterPair {
    letterOne: PlugboardLetter;
    letterTwo: PlugboardLetter;
    letterPair: string;
    pairColour?: string;

    constructor(
        letterOne: PlugboardLetter,
        letterTwo: PlugboardLetter
    ) {
        this.letterOne = letterOne;
        this.letterTwo = letterTwo;
        this.letterPair = `${letterOne.letter}${letterTwo.letter}`;
    }
}