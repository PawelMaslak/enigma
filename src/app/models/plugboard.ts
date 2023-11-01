import EnigmaHelper from "../helpers/enigma-helper";
import { LetterPair, PlugboardLetter } from "./plugboardletter";

export class Plugboard {
    plugboardLetters: PlugboardLetter[]
    letterPairs: LetterPair[] = [];
    allowedPairsNumber: number = 10;
    pairColours: string[]

    constructor() {
        this.plugboardLetters = EnigmaHelper.getPlugboardLetters();
        this.pairColours = EnigmaHelper.getColourList();
    }
}