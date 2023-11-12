import { Injectable } from '@angular/core';
import { LocalMemoryEntry } from '../models/local-memory-entry';
import { Plugboard } from '../models/plugboard';
import { Rotor } from '../models/rotor';
import { RotorDto } from '../models/rotor-dto';
import { RotorSection } from '../models/rotor-section';
import { DataService } from './data-service';

@Injectable({
  providedIn: 'root',
})
export class LocalMemoryService {
  constructor(private dataService: DataService) {}

  public createLocalMemoryEntry(rotorSection: RotorSection, plugboard: Plugboard): LocalMemoryEntry {
    return new LocalMemoryEntry(rotorSection, plugboard);
  }

  public getPlugboardConfigurationFromLocalMemory(retrievedSettings: LocalMemoryEntry): Plugboard {
    return retrievedSettings.plugboard;
  }

  public getRotorsConfigurationFromLocalMemory(retrievedSettings: LocalMemoryEntry): RotorSection {
    const reflector = this.dataService.GetReflectorByGuid(retrievedSettings.rotorSection.reflector.guid);
    const rotors: Rotor[] = retrievedSettings.rotorSection.rotors
      .map((rotorDto) => this.configureRotorSettings(rotorDto))
      .filter((foundRotor) => foundRotor !== null);
    const rotorSection = new RotorSection(rotors, reflector);
    return this.verifyConfigCorrectness(retrievedSettings, rotorSection) ? rotorSection : null;
  }

  public updateRotor(retrievedRotorConfig: Rotor, existingRotor: Rotor): void {
    this.configureExistingRotorPosition(retrievedRotorConfig, existingRotor);
    this.configureExistingRotorRingSetting(retrievedRotorConfig, existingRotor);
  }

  private configureExistingRotorPosition(retrievedRotorConfig: Rotor, existingRotor: Rotor): void {
    const indexOfSettingsCurrentRotorPosition = retrievedRotorConfig.alphabetArray.indexOf(
      retrievedRotorConfig.currentPositionLetter,
    );
    const indexOfExistingRotorCurrentLetter = existingRotor.alphabetArray.indexOf(existingRotor.currentPositionLetter);

    const indexDifference = indexOfSettingsCurrentRotorPosition - indexOfExistingRotorCurrentLetter;
    const stepsNumber = (indexDifference + 26) % 26;

    existingRotor.stepRotor(-stepsNumber);
  }

  private configureExistingRotorRingSetting(retrievedRotorConfig: Rotor, existingRotor: Rotor): void {
    const retrievedRotorRingSetting = retrievedRotorConfig.ringSetting;
    const existingRotorRingSetting = existingRotor.ringSetting;

    const difference = retrievedRotorRingSetting - existingRotorRingSetting;
    const stepsNumber = difference;

    existingRotor.stepRingSetting(stepsNumber);
  }

  private configureRingSetting(rotorDto: RotorDto, foundRotor: Rotor): void {
    const ringsettingsCurrentRingSetting = rotorDto.ringSetting;
    foundRotor.stepRingSetting(ringsettingsCurrentRingSetting - 1);
  }

  private configureRotorPosition(rotorDto: RotorDto, foundRotor: Rotor): void {
    const indexOfSettingsCurrentRotorPosition = foundRotor.alphabetArray.indexOf(rotorDto.currentPositionLetter);
    foundRotor.stepRotor(-indexOfSettingsCurrentRotorPosition);
  }

  private configureRotorSettings(rotorDto: RotorDto): Rotor {
    const foundRotor = this.dataService.GetRotorByGuid(rotorDto.guid);

    if (!foundRotor) {
      return null;
    }

    this.configureRotorPosition(rotorDto, foundRotor);
    this.configureRingSetting(rotorDto, foundRotor);

    return foundRotor;
  }

  private verifyConfigCorrectness(retrievedSettings: LocalMemoryEntry, rotorSection: RotorSection): boolean {
    const reflectorExists = rotorSection.reflector != null;
    const correctRotorsNumber = rotorSection.allowedRotorsNumber === retrievedSettings.rotorSection.allowedRotorsNumber;
    return reflectorExists && correctRotorsNumber;
  }
}
