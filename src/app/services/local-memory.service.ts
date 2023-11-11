import { Injectable } from '@angular/core';
import { LocalMemoryEntry } from '../models/local-memory-entry';
import { ReflectorDto } from '../models/reflector-dto';
import { RotorDto } from '../models/rotor-dto';
import { RotorSection } from '../models/rotor-section';
import { RotorSectionDto } from '../models/rotor-section-dto';

@Injectable({
  providedIn: 'root',
})
export class LocalMemoryService {
  public createLocalMemoryEntry(rotorSection: RotorSection): LocalMemoryEntry {
    const selectedRotorsDto: RotorDto[] = [];
    const reflectorDto: ReflectorDto = new ReflectorDto(rotorSection.reflector);

    rotorSection.rotors.forEach((rotor) => {
      const rotorDto = new RotorDto(rotor);
      selectedRotorsDto.push(rotorDto);
    });

    return new LocalMemoryEntry(new RotorSectionDto(selectedRotorsDto, reflectorDto));
  }
}
