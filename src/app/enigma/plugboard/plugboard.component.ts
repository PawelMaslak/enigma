import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Plugboard } from 'src/app/models/plugboard';
import { LetterPair, PlugboardLetter } from 'src/app/models/plugboardletter';
import { PlugboardService } from 'src/app/services/plugboard-service';

@Component({
  selector: 'app-plugboard',
  templateUrl: './plugboard.component.html',
  styleUrls: ['./plugboard.component.scss'],
})
export class PlugboardComponent implements OnInit, OnChanges {
  @Input() plugboard: Plugboard;

  firstRow: PlugboardLetter[];
  letterPairs: LetterPair[];
  secondRow: PlugboardLetter[];
  thirdRow: PlugboardLetter[];

  constructor(private plugboardService: PlugboardService) {}

  public getLetterPairString(index: number): string {
    return this.plugboardService.getLetterPairString(index);
  }

  public letterPlugged(letter: string): boolean {
    return this.plugboardService.keyPairs.find((x) => x.letter === letter) != null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('plugboard' in changes) {
      const updatedPlugboard = changes['plugboard'].currentValue as Plugboard;
      this.plugboard = updatedPlugboard;
      this.firstRow = this.plugboard.plugboardLetters.slice(0, 9);
      this.secondRow = this.plugboard.plugboardLetters.slice(9, 17);
      this.thirdRow = this.plugboard.plugboardLetters.slice(17, 26);
      this.letterPairs = this.plugboard.letterPairs;
    }
  }

  ngOnInit(): void {
    this.plugboardService.initPlugboard(this.plugboard);
    this.firstRow = this.plugboard.plugboardLetters.slice(0, 9);
    this.secondRow = this.plugboard.plugboardLetters.slice(9, 17);
    this.thirdRow = this.plugboard.plugboardLetters.slice(17, 26);
    this.letterPairs = this.plugboardService.letterPairs;
  }

  public pairKey(plugboardLetter: PlugboardLetter): void {
    this.plugboardService.processKeySelect(plugboardLetter);
  }
}
