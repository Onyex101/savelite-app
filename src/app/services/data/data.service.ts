import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private barData = new BehaviorSubject([0, 0, 0, 0, 0, 0, 0]);
  currentbarData = this.barData.asObservable();

  constructor() { }

  changeData(data: any) {
    this.barData.next(data);
  }

}
