import { Reflector } from './reflector';
import { ReflectorDto } from './reflector-dto';
import { Rotor } from './rotor';
import { RotorDto } from './rotor-dto';
import { RotorSection } from './rotor-section';

export class RotorSectionDto {
  allowedRotorsNumber: number;
  reflector: ReflectorDto;

  rotors: RotorDto[];

  constructor(rotorSection: RotorSection) {
    this.rotors = this.mapRotors(rotorSection.rotors);
    this.reflector = this.mapReflector(rotorSection.reflector);
    this.allowedRotorsNumber = rotorSection.allowedRotorsNumber;
  }

  private mapReflector(reflector: Reflector): ReflectorDto {
    return new ReflectorDto(reflector);
  }

  private mapRotors(rotors: Rotor[]): RotorDto[] {
    const mappedRotors: RotorDto[] = [];

    rotors.forEach((rotor) => {
      mappedRotors.push(new RotorDto(rotor));
    });

    return mappedRotors;
  }
}
