import { Reflector } from './reflector';
import { Rotor } from './rotor';

export class RotorSection {
  allowedRotorsNumber: number;
  reflector: Reflector;
  rotors: Rotor[];

  constructor(selectedRotors: Rotor[], selectedReflector: Reflector) {
    this.rotors = selectedRotors;
    this.reflector = selectedReflector;
    this.allowedRotorsNumber = this.rotors.length;
  }
}
