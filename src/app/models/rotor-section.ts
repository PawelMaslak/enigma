import { Reflector } from "./reflector";
import { Rotor } from "./rotor";

export class RotorSection {
    rotors: Rotor[];
    reflector: Reflector;
    allowedRotorsNumber: number;

    constructor(
        selectedRotors: Rotor[],
        selectedReflector: Reflector
    ) {
        this.rotors = selectedRotors;
        this.reflector = selectedReflector;
        this.allowedRotorsNumber = this.rotors.length;
    }
}