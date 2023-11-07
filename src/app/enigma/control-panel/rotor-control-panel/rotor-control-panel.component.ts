import { Component, Input } from '@angular/core';
import { Rotor } from 'src/app/models/rotor';

@Component({
  selector: 'app-rotor-control-panel',
  templateUrl: './rotor-control-panel.component.html',
  styleUrls: ['./rotor-control-panel.component.scss'],
})
export class RotorControlPanelComponent {
  @Input() rotor: Rotor;

  public selectLetter(letter: string): void {
    const indexOfCurrentLetter = this.rotor.alphabetArray.indexOf(this.rotor.currentPositionLetter);
    const indexOfSelectedLetter = this.rotor.alphabetArray.indexOf(letter);

    let stepsAmount = indexOfSelectedLetter - indexOfCurrentLetter;
    stepsAmount = ((stepsAmount % 26) + 26) % 26;
    console.log(stepsAmount);
    for (let step = 1; step <= stepsAmount; step++) {
      this.rotor.stepRotor(-1);
    }
  }

  public selectRingSetting(ringSetting: number): void {
    console.log(ringSetting);
  }
}
