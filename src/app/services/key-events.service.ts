import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//To subscribe to it - Enigma machine -> For further processing
export class KeyEventsService {
  private keyPressSubject = new Subject<string>();
  keyPress$ = this.keyPressSubject.asObservable();
  emitKeyPress(key: string) {
    this.keyPressSubject.next(key);
  }
}
