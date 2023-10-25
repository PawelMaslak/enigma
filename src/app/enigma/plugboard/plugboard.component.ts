import { Component } from '@angular/core';
import EnigmaHelper from 'src/app/helpers/enigma-helper';

@Component({
  selector: 'app-plugboard',
  templateUrl: './plugboard.component.html',
  styleUrls: ['./plugboard.component.scss']
})
export class PlugboardComponent {
  alphabet: string[] = EnigmaHelper.getAlphabetArray();

  firstRow: string[] = EnigmaHelper.getFirstRowQwertzKeyboardLayout();
  secondRow: string[] = EnigmaHelper.getSecondRowQwertzKeyboardLayout();
  thirdRow: string[] = EnigmaHelper.getThirdRowQwertzKeyboardLayout();

  public characterNumber = (char: string) => `${this.alphabet.indexOf(char) + 1}`;
}
