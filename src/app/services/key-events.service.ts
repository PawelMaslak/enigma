/* eslint-disable */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyEventsService {
  public keyPressSubject = new Subject<string>();
  public keyProcessedSubject = new Subject<string>();
  public keyPress$ = this.keyPressSubject.asObservable();
  public keyProcessed$ = this.keyProcessedSubject.asObservable();

  public emitKeyPress(key: string): void {
    this.keyPressSubject.next(key);
  }

  public emitProcessedKeyOutput(key: string): void {
    this.keyProcessedSubject.next(key);
  }
}
