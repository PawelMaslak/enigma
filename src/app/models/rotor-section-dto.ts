import { ReflectorDto } from './reflector-dto';
import { RotorDto } from './rotor-dto';

export class RotorSectionDto {
  reflector: ReflectorDto;
  rotors: RotorDto[];

  constructor(selectedRotors: RotorDto[], selectedReflector: ReflectorDto) {
    this.rotors = selectedRotors;
    this.reflector = selectedReflector;
  }
}
