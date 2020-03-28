import { ExpenseService, IExpense } from './../../../services/expenses/expense.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {

  addExpenseForm: FormGroup;
  categories: Array<string>;
  errorMessage = {
    date: [
      { type: 'required', message: 'Please enter a Date.' },
    ],
    amount: [
      { type: 'required', message: 'Please enter an amount.' },
      { type: 'pattern', message: 'Please enter a positive amount' },
    ],
    descr: [
      { type: 'required', message: 'Description is required.' },
    ],
  };
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService
  ) {
    this.categories = ['Health', 'Food', 'Education', 'Transport', 'Entertainment', 'Shopping', 'Others'];
  }

  ngOnInit() {
    // this.db.dbState().subscribe((res) => {
    //   if (res) {
    //     this.db.fetchExpenses().subscribe(item => {
    //       console.log(item);
    //     });
    //   }
    // });
    this.initForm();
  }

  initForm() {
    this.addExpenseForm = this.formBuilder.group({
      date: ['', Validators.compose([
        Validators.required,
      ])],
      amount: [, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')
      ])],
      category: ['', Validators.compose([
        Validators.required
      ])],
      descr: ['', Validators.compose([
        Validators.required,
      ])],
      remark: [''],
    });
  }

  createExpense(value: IExpense) {
    if (value.category === 'Health') {
      value.icon = 'medkit';
    } else if (value.category === 'Food') {
      value.icon = 'pizza';
    } else if (value.category === 'Education') {
      value.icon = 'school';
    } else if (value.category === 'Transport') {
      value.icon = 'car-sport';
    } else if (value.category === 'Entertainment') {
      value.icon = 'musical-notes';
    } else if (value.category === 'Shopping') {
      value.icon = 'cart';
    } else {
      value.icon = 'ellipsis-horizontal';
    };
    value.id = this.randString(6);
    this.expenseService.addExpense(value).then(() => {
      this.addExpenseForm.reset();
      this.router.navigateByUrl('/tabs/tabs/home');
    });
  }

  randString(num: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < num; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
