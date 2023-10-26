import EnigmaHelper from "../helpers/enigma-helper";

export class PlugboardLetter {
    letter: string;
    letterNumber: number;
    isPlugged: boolean;
    pluggedLetter: string;

    constructor(
        letter: string
    ) {
        this.letter = letter;
        this.isPlugged = false;
        this.pluggedLetter = '';
        this.letterNumber = EnigmaHelper.getLetterNumberInAlphabet(letter);
    }
}

export class LetterPair {
    letterOne: PlugboardLetter;
    letterTwo: PlugboardLetter;
    letterPair: string;
    pairColour: string;

    constructor(
        letterOne: PlugboardLetter,
        letterTwo: PlugboardLetter
    ) {
        this.letterOne = letterOne;
        this.letterTwo = letterTwo;
        this.letterPair = `${letterOne.letter}${letterTwo.letter}`;
        this.pairColour = this.getRandomColour();
    }

    //TODO: Assign random colour from the approved colour list to mark the pair on plugboard.
    private getRandomColour(): string {
        return '';
    }
}