import { Injectable } from '@angular/core';
import reflectorJson from 'src/assets/data/reflectors.json';
import rotorJson from 'src/assets/data/rotors.json';
import { Reflector } from '../models/reflector';
import { Rotor } from '../models/rotor';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public GetReflectorCollection(): Reflector[] {
    return reflectorJson.map((reflector) => new Reflector(reflector.Name, reflector.Letters, reflector.Guid));
  }

  public GetRotorCollection(): Rotor[] {
    return rotorJson.map(
      (rotor, index) => new Rotor(index, rotor.Name, rotor.TurnOverLetter, rotor.Letters, rotor.Guid),
    );
  }
}
