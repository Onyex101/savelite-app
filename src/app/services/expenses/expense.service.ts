import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

export interface IExpense {
  id: string;
  date: string;
  amount: number;
  category: string;
  descr: string;
  remark?: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expList = new BehaviorSubject([]);
  currentExpList = this.expList.asObservable();
  private budget = new BehaviorSubject(0);
  currentBudget = this.budget.asObservable();

  constructor(
    private storage: Storage
  ) {
    this.getExpense();
    this.getBudget();
  }

  getExpense(): Promise<any> {
    return new Promise((resolve, reject) => {
      const expenses = [];
      const payload = {
        expense: []
      };
      this.storage.get('expenses').then((res) => {
        if (res === null || undefined) {
          this.storage.set('expenses', payload).then((exp) => {
            this.expList.next(exp.expense);
            resolve(exp.expense);
          });
        } else {
          res.expense.forEach((item) => {
            expenses.push(item);
          });
          this.expList.next(expenses);
          resolve(expenses);
        }
      }).catch((err) => {
        console.log(err);
        reject(expenses);
      });
    });
  }

  addExpense(data: IExpense): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload = {
        expense: [data]
      };
      this.storage.get('expenses').then((expeense) => {
        expeense.expense.forEach((item) => {
          payload.expense.push(item);
        });
        this.storage.set('expenses', payload).then((exp) => {
          this.expList.next(exp.expense);
          resolve(exp.expense);
        });
      });
    });
  }

  editExpense(data: IExpense): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload = {
        expense: [data]
      };
      this.storage.get('expenses').then((expense) => {
        expense.expense.forEach((item) => {
          if (item.id !== data.id) {
            payload.expense.push(item);
          }
        });
        this.storage.set('expenses', payload).then((exp) => {
          this.expList.next(exp.expense);
          resolve(exp.expense);
        });
      });
    });
  }

  deleteExpense(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let list: any[];
      const payload = {
        expense: []
      };
      this.storage.get('expenses').then((expeense) => {
        list = expeense.expense.filter((item) => {
          return item.id !== id;
        });
        payload.expense = list;
        this.storage.set('expenses', payload).then((exp) => {
          this.expList.next(exp.expense);
          resolve(exp.expense);
        });
      });
    });
  }

  getBudget(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('budget').then((res) => {
        if (res === null || undefined) {
          this.storage.set('budget', 0).then((r) => {
            this.budget.next(r);
            resolve(r);
          });
        } else {
          this.budget.next(res);
          resolve(res);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

  setBudget(data: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.set('budget', data).then((res) => {
        this.budget.next(res);
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  removeExpense(data: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.set('budget', data).then((res) => {
        this.budget.next(res);
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
