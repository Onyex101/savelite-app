import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private barData = new BehaviorSubject([0, 0, 0, 0, 0, 0, 0]);
  currentbarData = this.barData.asObservable();

  private dataUpdatedEvent: Subject<any> = new Subject();

  private budgetId = new BehaviorSubject('');
  currentBudgetId = this.budgetId.asObservable();

  constructor() {}

  changeData(data: any) {
    this.barData.next(data);
  }

  emitBudgetIdEvent(data: string) {
    this.budgetId.next(data);
  }

  emitDataUpdatedEvent() {
    this.dataUpdatedEvent.next();
  }

  getDataUpdatedEvent$(): Observable<boolean> {
    return this.dataUpdatedEvent.asObservable();
  }
}
