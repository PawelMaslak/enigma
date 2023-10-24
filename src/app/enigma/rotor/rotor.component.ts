import { Component, Input } from '@angular/core';
import { Rotor } from 'src/app/models/rotor';

@Component({
  selector: 'app-rotor',
  templateUrl: './rotor.component.html',
  styleUrls: ['./rotor.component.scss']
})
export class RotorComponent {
  @Input() rotor: Rotor;
  @Input() ringSettingsVisible: boolean;

  public step(i: number) : void {
    this.rotor.stepRotor(i);
  }

  public stepRingSetting(i: number) {
    this.rotor.stepRingSetting(i);
  }
}
