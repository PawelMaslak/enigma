import { Component, OnInit } from '@angular/core';
import { KeyEventsService } from 'src/app/services/key-events.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  public inputContent: string = '';
  public inputLetters: string[] = [];
  public outputContent: string = '';
  public outputLetters: string[] = [];

  constructor(private keyEventsService: KeyEventsService) {}

  public async copyOutput(): Promise<void> {
    if (this.outputContent.length > 0) {
      await navigator.clipboard.writeText(this.outputContent);
      alert('Output copied to clipboard!');
    }
  }

  ngOnInit(): void {
    this.subscribeToKeyEvents();
  }

  private getArrayLengthWithoutWhiteSpaces(array: string[]): number {
    const arrayWithoutSpaces = array.filter((key) => key !== ' ');
    return arrayWithoutSpaces.length;
  }

  private processKeyEvent(key: string, action: string): void {
    if (action === 'input') {
      this.inputLetters.push(key);
      this.inputContent = this.inputLetters.join('');
    } else {
      this.outputLetters.push(key);
      const length = this.getArrayLengthWithoutWhiteSpaces(this.outputLetters);
      if (length % 5 == 0) {
        this.outputLetters.push(' ');
      }
      this.outputContent = this.outputLetters.join('');
    }
  }

  private subscribeToKeyEvents(): void {
    this.keyEventsService.keyPress$.subscribe((key) => {
      this.processKeyEvent(key, 'input');
    });
    this.keyEventsService.keyProcessed$.subscribe((key) => {
      this.processKeyEvent(key, 'output');
    });
  }
}
