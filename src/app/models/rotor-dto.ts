import { Rotor } from './rotor';

export class RotorDto {
  currentPositionLetter: string;
  guid: string;
  ringSetting: number;

  constructor(rotor: Rotor) {
    this.currentPositionLetter = rotor.currentPositionLetter;
    this.ringSetting = rotor.ringSetting;
    this.guid = rotor.guid;
  }
}
