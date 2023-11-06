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
  public ringSettingsVisible: boolean = false;

  public toggleRingSettings(): void {
    this.ringSettingsVisible = !this.ringSettingsVisible;

    this.rotorSection.rotors.forEach((rotor) => {
      rotor.ringSettingVisible = this.ringSettingsVisible;
    });
  }
}
