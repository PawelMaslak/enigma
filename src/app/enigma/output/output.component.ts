import { Component, OnInit } from '@angular/core';
import { KeyEventsService } from 'src/app/services/key-events.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  public outputContent: string = '';
  public outputLetters: string[] = [];

  constructor(private keyEventsService: KeyEventsService) {}

  ngOnInit(): void {
    this.keyEventsService.keyProcessed$.subscribe((key) => {
      // Process the key press event here, e.g., call a method
      this.processKey(key);
    });
  }

  private processKey(key: string): void {
    this.outputLetters.push(key);
    this.outputContent = this.outputLetters.join('');
  }
}
