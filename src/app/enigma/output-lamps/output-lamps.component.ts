import { Component, OnInit } from '@angular/core';
import EnigmaHelper from 'src/app/helpers/enigma-helper';
import { KeyEventsService } from 'src/app/services/key-events.service';

@Component({
  selector: 'app-output-lamps',
  templateUrl: './output-lamps.component.html',
  styleUrls: ['./output-lamps.component.scss'],
})
export class OutputLampsComponent implements OnInit {
  firstRow: string[] = EnigmaHelper.getFirstRowQwertzKeyboardLayout();
  returnedChar: string = '';
  secondRow: string[] = EnigmaHelper.getSecondRowQwertzKeyboardLayout();
  thirdRow: string[] = EnigmaHelper.getThirdRowQwertzKeyboardLayout();
  constructor(private keyEventsService: KeyEventsService) {}

  ngOnInit(): void {
    this.keyEventsService.keyProcessed$.subscribe((key) => {
      // Process the key press event here, e.g., call a method
      this.processKeyPress(key);
    });
  }

  private processKeyPress(key: string): void {
    this.returnedChar = key;
    console.log(`Key pressed and captured inside lamp-component: ${key}`);

    setTimeout(() => {
      this.returnedChar = '';
    }, 400);
  }
}
