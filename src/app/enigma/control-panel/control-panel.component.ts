import { Component, Input } from '@angular/core';
import { Plugboard } from 'src/app/models/plugboard';
import { RotorSection } from 'src/app/models/rotor-section';

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

  public getRingSettingsText(): string {
    return this.ringSettingsVisible ? 'Set Rotor Position' : 'Set Ring Settings';
  }

  public loadMachineSettings(): void {
    alert('Settings loaded');
  }

  public resetSettings(): void {
    //Calculate steps
    //Calculate ring settings
    //Remove all encoded text
    //Remove plugs
  }

  public saveMachineSettings(): void {
    this.machineConfigurationAvailable = true;
    alert('Settings saved');
  }

  public toggleRingSettings(): void {
    this.ringSettingsVisible = !this.ringSettingsVisible;

    this.rotorSection.rotors.forEach((rotor) => {
      rotor.ringSettingVisible = this.ringSettingsVisible;
    });
  }
}
