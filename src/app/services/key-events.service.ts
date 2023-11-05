import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyEventsService {
  keyPress$ = this.keyPressSubject.asObservable();
  keyProcessed$ = this.keyProcessedSubject.asObservable();
  private keyPressSubject = new Subject<string>();

  private keyProcessedSubject = new Subject<string>();

  emitKeyPress(key: string) {
    this.keyPressSubject.next(key);
  }

  emitProcessedKeyOutput(key: string) {
    this.keyProcessedSubject.next(key);
  }
}
