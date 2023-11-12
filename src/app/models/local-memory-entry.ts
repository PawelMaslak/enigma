import { Plugboard } from './plugboard';
import { RotorSection } from './rotor-section';
import { RotorSectionDto } from './rotor-section-dto';

export class LocalMemoryEntry {
  plugboard: Plugboard;
  rotorSection: RotorSectionDto;

  constructor(rotorSection: RotorSection, plugboard: Plugboard) {
    this.rotorSection = new RotorSectionDto(rotorSection);
    this.plugboard = plugboard;
  }
}
