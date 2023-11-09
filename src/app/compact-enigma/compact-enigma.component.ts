import { Component, Input } from '@angular/core';
import { Plugboard } from '../models/plugboard';
import { RotorSection } from '../models/rotor-section';

@Component({
  selector: 'app-compact-enigma',
  templateUrl: './compact-enigma.component.html',
  styleUrls: ['./compact-enigma.component.scss'],
})
export class CompactEnigmaComponent {
  @Input() plugboard: Plugboard;
  @Input() rotorSection: RotorSection;
}
