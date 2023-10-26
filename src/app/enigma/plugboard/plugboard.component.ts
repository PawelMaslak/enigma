import { Component, OnInit } from '@angular/core';
import EnigmaHelper from 'src/app/helpers/enigma-helper';
import { LetterPair, PlugboardLetter } from 'src/app/models/plugboardletter';

@Component({
  selector: 'app-plugboard',
  templateUrl: './plugboard.component.html',
  styleUrls: ['./plugboard.component.scss']
})
export class PlugboardComponent {
  private plugboardLetters: PlugboardLetter[] = EnigmaHelper.getPlugboardLetters();
  firstRow: PlugboardLetter[] = this.plugboardLetters.slice(0, 9);
  secondRow: PlugboardLetter[] = this.plugboardLetters.slice(9, 17);
  thirdRow: PlugboardLetter[] = this.plugboardLetters.slice(17, 26);
  keyPairs: PlugboardLetter[] = [];
  letterPairs: LetterPair[] = [];

  //When user clicks one of the plugboard entries -> add letter to the plugboard collection.
  //When user clicks once again at the plugboard entry -> remove item from collection.
  //If there are 2 elements -> make a key pair -> if one of the elements is removed -> move the other one at the end of the list.
  public pairKey(plugboardLetter: PlugboardLetter): void {
    if (this.keyPairs.find(x => x.letter === plugboardLetter.letter)) {
      //Check if the item is in the letter pairs -> if it is - remove the pair.
      console.log(`Letter ${plugboardLetter.letter} is already in the list...removing the letter!`);
      this.removeItem(plugboardLetter);
    }
    else {
      this.keyPairs.push(plugboardLetter);

      if(this.keyPairs.length % 2 == 0) {
        //Handle maximum amount of items in array - max 10 pairs
        //Check if the pair exists before adding it - if exists -> remove
        this.letterPairs.push(new LetterPair(this.keyPairs[0], this.keyPairs[1]))
        this.clearKeyPairs();
        console.log(this.letterPairs);
      }
    }
  }

  private clearKeyPairs() {
    this.keyPairs.splice(0,2);
  }

  private removeItem(plugboardLetter: PlugboardLetter): void {
    const index = this.keyPairs.indexOf(plugboardLetter);
    if (index > -1) {
      this.keyPairs.splice(index, 1);
    }
  }
}
