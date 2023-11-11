import { Component, Input } from '@angular/core';
import { Plugboard } from 'src/app/models/plugboard';
import { RotorSection } from 'src/app/models/rotor-section';
import { LocalMemoryService } from 'src/app/services/local-memory.service';

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

  constructor(private localMemoryService: LocalMemoryService) {}

  public getRingSettingsText(): string {
    return this.ringSettingsVisible ? 'Set Rotor Position' : 'Set Ring Settings';
  }

  public loadMachineSettings(): void {
    const parsedConfiguration = JSON.parse(localStorage.getItem('configuration'));
    //const mappedObject = mapToLocalMemoryEntry(parsedConfiguration);
    console.log(parsedConfiguration);
    alert('Settings loaded');
  }

  public resetSettings(): void {
    //Calculate steps
    //Calculate ring settings
    //Remove all encoded text
    //Remove plugs
  }

  //Create RotorDTO for saving
  public saveMachineSettings(): void {
    const localMemoryObject = this.localMemoryService.createLocalMemoryEntry(this.rotorSection);
    console.log(localMemoryObject);
    localStorage.setItem('configuration', JSON.stringify(localMemoryObject));
    this.machineConfigurationAvailable = true;
    alert('Settings saved');
  }

  public toggleRingSettings(): void {
    this.ringSettingsVisible = !this.ringSettingsVisible;

    this.rotorSection.rotors.forEach((rotor) => {
      rotor.ringSettingVisible = this.ringSettingsVisible;
    });
  }

  private mapToLocalMemoryEntry(parsedConfiguration: any): void {
    console.log('Map here');
  }
}
