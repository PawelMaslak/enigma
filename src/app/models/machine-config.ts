import { Plugboard } from './plugboard';
import { RotorSection } from './rotor-section';

export class MachineConfig {
  plugboard: Plugboard;
  rotorSection: RotorSection;

  constructor(rotorSection: RotorSection, plugboard: Plugboard) {
    this.rotorSection = rotorSection;
    this.plugboard = plugboard;
  }
}
