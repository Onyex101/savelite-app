import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService, IExpense } from './../../services/expenses/expense.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  expense: IExpense;
  editExpenseForm: FormGroup;
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
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private modalCtrl: ModalController
  ) {
    this.categories = ['Health', 'Food', 'Education', 'Transport', 'Entertainment', 'Shopping', 'Others'];
    this.expense = navParams.get('expense');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.editExpenseForm = this.formBuilder.group({
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
    this.editExpenseForm.controls.date.setValue(this.expense.date);
    this.editExpenseForm.controls.amount.setValue(this.expense.amount);
    this.editExpenseForm.controls.category.setValue(this.expense.category);
    this.editExpenseForm.controls.descr.setValue(this.expense.descr);
    this.editExpenseForm.controls.remark.setValue(this.expense.remark);
  }

  onSubmit(value) {
    value.id = this.expense.id;
    value.icon = this.expense.icon;
    this.expenseService.editExpense(value).then(() => {
      this.editExpenseForm.reset();
      this.modalCtrl.dismiss();
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
