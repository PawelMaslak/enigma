import { Component, OnInit } from '@angular/core';
import EnigmaHelper from 'src/app/helpers/enigma-helper';
import { KeyEventsService } from 'src/app/services/key-events.service';

@Component({
  selector: 'app-output-lamps',
  templateUrl: './output-lamps.component.html',
  styleUrls: ['./output-lamps.component.scss']
})
export class OutputLampsComponent implements OnInit {
  constructor(private keyEventsService: KeyEventsService) { }

  returnedChar: string = '';
  firstRow: string[] = EnigmaHelper.getFirstRowQwertzKeyboardLayout();
  secondRow: string[] = EnigmaHelper.getSecondRowQwertzKeyboardLayout();
  thirdRow: string[] = EnigmaHelper.getThirdRowQwertzKeyboardLayout();
  
  ngOnInit(): void {
    this.keyEventsService.keyProcessed$.subscribe(key => {
      // Process the key press event here, e.g., call a method
      this.processKeyPress(key);
    });
  }

  processKeyPress(key: string) {
    this.returnedChar = key;
    console.log(`Key pressed and captured inside lamp-component: ${key}`);
    
    setTimeout(() => {
      this.returnedChar = '';
    }, 400);
  }
}
