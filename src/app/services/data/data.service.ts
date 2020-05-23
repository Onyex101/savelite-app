import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private barData = new BehaviorSubject([0, 0, 0, 0, 0, 0, 0]);
  currentbarData = this.barData.asObservable();

  private dataUpdatedEvent: Subject<any> = new Subject();

  private budget = new BehaviorSubject({
    _id: '',
    budgetName : '',
    budget : 0,
    _userID : '',
    expenses : [],
    images : [],
    createdAt : '',
    updatedAt : '',
  });
  currentBudget = this.budget.asObservable();

  constructor() { }

  changeData(data: any) {
    this.barData.next(data);
  }

  emitBudgetEvent(data: any) {
    this.budget.next(data);
  }

  emitDataUpdatedEvent() {
    this.dataUpdatedEvent.next();
  }

  getDataUpdatedEvent$(): Observable<boolean> {
    return this.dataUpdatedEvent.asObservable();
  }
}
