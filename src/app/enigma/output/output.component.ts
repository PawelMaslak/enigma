import { Component } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent {
  public outputContent: string = 'This is sample Enigma output';
}
