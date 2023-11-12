import { Component, Input } from '@angular/core';
import { LocalMemoryEntry } from 'src/app/models/local-memory-entry';
import { Plugboard } from 'src/app/models/plugboard';
import { RotorSection } from 'src/app/models/rotor-section';
import { LocalMemoryService } from 'src/app/services/local-memory.service';
import { PlugboardService } from 'src/app/services/plugboard-service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent {
  @Input() plugboard: Plugboard;
  @Input() rotorSection: RotorSection;
  public machineConfigurationAvailable: boolean = false;
  public ringSettingsVisible: boolean = false;

  constructor(
    private localMemoryService: LocalMemoryService,
    private plugboardService: PlugboardService,
  ) {
    localStorage.getItem('configuration') != null
      ? (this.machineConfigurationAvailable = true)
      : (this.machineConfigurationAvailable = false);
  }

  public getPlugboardConfig(): void {
    console.log(this.plugboard);
  }

  public getRingSettingsText(): string {
    return this.ringSettingsVisible ? 'Set Rotor Position' : 'Set Ring Settings';
  }

  public loadMachineSettings(): void {
    const parsedConfiguration = JSON.parse(localStorage.getItem('configuration'));
    const configurationLoaded = this.updateConfiguration(parsedConfiguration);
    configurationLoaded
      ? console.log('Settings loaded')
      : console.log('Could not load the saved settings. Using default settings');
  }

  public resetSettings(): void {
    //Calculate steps
    //Calculate ring settings
    //Remove all encoded text
    //Remove plugs
  }

  public saveMachineSettings(): void {
    const localMemoryObject = this.localMemoryService.createLocalMemoryEntry(this.rotorSection, this.plugboard);
    console.log(localMemoryObject);
    localStorage.setItem('configuration', JSON.stringify(localMemoryObject));
    this.machineConfigurationAvailable = true;
    console.log(localMemoryObject);
    console.log('Settings saved');
  }

  public toggleRingSettings(): void {
    this.ringSettingsVisible = !this.ringSettingsVisible;

    this.rotorSection.rotors.forEach((rotor) => {
      rotor.ringSettingVisible = this.ringSettingsVisible;
    });
  }

  public updateConfiguration(parsedConfiguration: LocalMemoryEntry): boolean {
    const retrievedRotorConfig = this.mapSavedRotorConfiguration(parsedConfiguration);
    const retrievedPlugboardConfig = this.mapSavedPlugboardConfiguration(parsedConfiguration);

    if (retrievedRotorConfig == null && retrievedPlugboardConfig) {
      return false;
    } else {
      this.rotorSection.reflector = retrievedRotorConfig.reflector;
      this.rotorSection.rotors.forEach((rotor, index) => {
        this.localMemoryService.updateRotor(retrievedRotorConfig.rotors[index], rotor);
      });

      //this.processRetrievedPlugboardConfig(retrievedPlugboardConfig);

      return true;
    }
  }

  private mapSavedPlugboardConfiguration(parsedConfiguration: LocalMemoryEntry): Plugboard {
    return this.localMemoryService.getPlugboardConfigurationFromLocalMemory(parsedConfiguration);
  }

  private mapSavedRotorConfiguration(parsedConfiguration: LocalMemoryEntry): RotorSection {
    return this.localMemoryService.getRotorsConfigurationFromLocalMemory(parsedConfiguration);
  }

  private processRetrievedPlugboardConfig(retrievedPlugboardConfig: Plugboard): void {
    console.log(retrievedPlugboardConfig);
    console.log(this.plugboardService.plugboard);

    retrievedPlugboardConfig.letterPairs.forEach((pair) => {
      const letterOne = pair.letterOne;
      const letterTwo = pair.letterTwo;
      //Get letter from plugboard and process it:
      const foundLetterOne = this.plugboardService.plugboard.plugboardLetters.find(
        (letter) => letter.letter === letterOne.letter,
      );
      const foundLetterTwo = this.plugboardService.plugboard.plugboardLetters.find(
        (letter) => letter.letter === letterTwo.letter,
      );

      this.plugboardService.processKeySelect(foundLetterOne);
      this.plugboardService.processKeySelect(foundLetterTwo);
      console.log(foundLetterOne, foundLetterTwo);
    });

    this.plugboardService.initPlugboard(retrievedPlugboardConfig);

    console.log(this.plugboardService.plugboard);

    //   retrievedPlugboardConfig.letterPairs.forEach((pair) => {
    //     this.plugboardService.processInput(pair.letterOne, this.plugboard);
    //     this.plugboardService.processInput(pair.letterTwo, this.plugboard);
    //     const plugboardLetterOne = this.plugboard.plugboardLetters.find(
    //       (letter) => letter.letter == pair.letterOne.letter,
    //     );
    //     const plugboardLetterTwo = this.plugboard.plugboardLetters.find(
    //       (letter) => letter.letter == pair.letterTwo.letter,
    //     );

    //     //Update letters
    //     plugboardLetterOne.isPlugged = true;
    //     plugboardLetterOne.pairColour = pair.letterOne.pairColour;
    //     plugboardLetterTwo.isPlugged = true;
    //     plugboardLetterTwo.pairColour = pair.letterTwo.pairColour;
    //   });

    //   console.log(this.plugboard);
    // }
  }
}
