import { RotorSectionDto } from './rotor-section-dto';

export class LocalMemoryEntry {
  rotorSection: RotorSectionDto;

  constructor(rotorSectionDto: RotorSectionDto) {
    this.rotorSection = rotorSectionDto;
  }
}
