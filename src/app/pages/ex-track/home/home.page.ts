import { ExpenseService, IExpense } from './../../../services/expenses/expense.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';
import { BudgetModalComponent } from './../../../components/budget-modal/budget-modal.component';
import { DetailsComponent } from './../../../components/details/details.component';
import { DataService } from './../../../services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  anyExpense = false;
  diag = false;
  expenseList: Array<IExpense>;
  budget: number;
  expense: number;
  balance: number;
  chart: Array<[string, any]>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private expenseService: ExpenseService,
    private share: DataService,
    public modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.expenseService.currentExpList.subscribe((exp) => {
      this.expenseList = exp;
      if (this.expenseList.length > 0) {
        this.anyExpense = true;
      }
      // console.log('expenses', exp);
      this.calculate();
    });
    this.expenseService.currentBudget.subscribe((b) => {
      this.budget = b;
      // console.log('budget', b);
      this.calculate();
    });
  }

  sddExpense() {
    this.router.navigateByUrl('/add-expense');
  }

  delExp(id: string) {
    this.expenseService.deleteExpense(id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BudgetModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.expenseService.setBudget(result);
        this.budget = result;
      }
    });
  }

  openExpense() {
    const dialogRef = this.dialog.open(BudgetModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.expenseService.setBudget(result);
        this.budget = result;
        this.router.navigateByUrl('/tabs/tabs/add-expense');
      }
    });
  }

  calculate() {
    let expenses = 0;
    let data = [];
    let h = 0, f = 0, e = 0, t = 0, m = 0, s = 0, o = 0;
    this.expenseList.forEach((item) => {
      expenses += item.amount;
      if (item.category === 'Health') {
        h += item.amount;
      } else if (item.category === 'Food') {
        f += item.amount;
      } else if (item.category === 'Education') {
        e += item.amount;
      } else if (item.category === 'Transport') {
        t += item.amount;
      } else if (item.category === 'Entertainment') {
        m += item.amount;
      } else if (item.category === 'Shopping') {
        s += item.amount;
      } else {
        o += item.amount;
      }
    });
    this.expense = expenses;
    this.balance = this.budget - this.expense;
    data = [h, f, e, t, m, s, o];
    this.share.changeData(data);
    // console.log('categorize', data);
  }

  async editExpense(expense: IExpense) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        expense,
      }
    });
    return await modal.present();
  }

  mode() {
    this.router.navigateByUrl('/mode');
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}
