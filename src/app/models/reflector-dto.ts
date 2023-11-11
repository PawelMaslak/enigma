import { Reflector } from './reflector';

export class ReflectorDto {
  guid: string;

  constructor(reflector: Reflector) {
    this.guid = reflector.guid;
  }
}
