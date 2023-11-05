import { Injectable } from '@angular/core';
import { Reflector } from '../models/reflector';
import { Rotor } from '../models/rotor';
import rotorJson from 'src/assets/data/rotors.json';
import reflectorJson from 'src/assets/data/reflectors.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public GetReflectorCollection(): Reflector[] {
    return reflectorJson.map((reflector) => new Reflector(reflector.Name, reflector.Letters));
  }

  public GetRotorCollection(): Rotor[] {
    return rotorJson.map((rotor, index) => new Rotor(index, rotor.Name, rotor.TurnOverLetter, rotor.Letters));
  }
}
