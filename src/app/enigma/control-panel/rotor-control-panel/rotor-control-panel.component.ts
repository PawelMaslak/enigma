import { Component, Input } from '@angular/core';
import EnigmaHelper from 'src/app/helpers/enigma-helper';
import { Rotor } from 'src/app/models/rotor';

@Component({
  selector: 'app-rotor-control-panel',
  templateUrl: './rotor-control-panel.component.html',
  styleUrls: ['./rotor-control-panel.component.scss'],
})
export class RotorControlPanelComponent {
  @Input() rotor: Rotor;
  public ringSettingsNumbersArray: number[];

  constructor() {
    this.ringSettingsNumbersArray = EnigmaHelper.getRingSettingsNumberArray();
  }

  public selectLetter(letter: string): void {
    const indexOfCurrentLetter = this.rotor.alphabetArray.indexOf(this.rotor.currentPositionLetter);
    const indexOfSelectedLetter = this.rotor.alphabetArray.indexOf(letter);

    let stepsAmount = indexOfSelectedLetter - indexOfCurrentLetter;
    stepsAmount = -((stepsAmount % 26) + 26) % 26;

    this.rotor.stepRotor(stepsAmount);
  }

  public selectRingSetting(ringSetting: number): void {
    const indexOfCurrentSetting = this.rotor.ringSettingNumbersArray.indexOf(this.rotor.ringSetting);
    const indexOfSelectedSetting = this.rotor.ringSettingNumbersArray.indexOf(ringSetting);

    let stepsAmount = indexOfSelectedSetting - indexOfCurrentSetting;
    stepsAmount = ((stepsAmount % 26) + 26) % 26;

    this.rotor.stepRingSetting(stepsAmount);
  }
}
