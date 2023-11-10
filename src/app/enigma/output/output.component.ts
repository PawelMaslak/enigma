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

  ngOnInit(): void {
    this.subscribeToKeyEvents();
  }

  private processKeyEvent(key: string, action: string): void {
    if (action === 'input') {
      this.inputLetters.push(key);
      this.inputContent = this.inputLetters.join('');
    } else {
      this.outputLetters.push(key);
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
