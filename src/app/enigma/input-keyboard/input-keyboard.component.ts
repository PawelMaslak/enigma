import { Component, HostListener } from '@angular/core';
import EnigmaHelper from 'src/app/helpers/enigma-helper';
import { KeyEventsService } from 'src/app/services/key-events.service';

@Component({
  selector: 'app-input-keyboard',
  templateUrl: './input-keyboard.component.html',
  styleUrls: ['./input-keyboard.component.scss'],
})
export class InputKeyboardComponent {
  alphabet: string[] = EnigmaHelper.getAlphabetArray();
  firstRow: string[] = EnigmaHelper.getFirstRowQwertzKeyboardLayout();
  pressedKey: string = '';
  secondRow: string[] = EnigmaHelper.getSecondRowQwertzKeyboardLayout();
  thirdRow: string[] = EnigmaHelper.getThirdRowQwertzKeyboardLayout();
  constructor(private keyEventsService: KeyEventsService) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPressed = event.key.toUpperCase();
    if (this.alphabet.includes(keyPressed)) {
      this.pressedKey = keyPressed;
      this.keyEventsService.emitKeyPress(keyPressed);
      setTimeout(() => {
        this.pressedKey = '';
      }, 200);
    }
  }

  keyClicked(letter: string) {
    this.pressedKey = letter;
    this.keyEventsService.emitKeyPress(letter);
    console.log(letter);

    setTimeout(() => {
      this.pressedKey = '';
    }, 200);
  }
}
