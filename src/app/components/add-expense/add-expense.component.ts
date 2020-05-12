
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IExpense } from 'src/app/interface/dto';
import { LoadingController, NavParams, ModalController } from '@ionic/angular';
import { ErrorMessages } from './../../pages/validation';
import { ApiService } from './../../services/api/api.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

  addExpenseForm: FormGroup;
  categories: Array<string>;
  errorMessage = ErrorMessages.addExpenseError;
  budgetId: string;

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private api: ApiService,
    private navParams: NavParams,
    private modalCtrl: ModalController,
  ) {
    this.categories = ['Health', 'Food', 'Education', 'Transport', 'Entertainment', 'Shopping', 'Others'];
    this.budgetId = this.navParams.get('id');
  }

  ngOnInit() {
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

  async createExpense(value: IExpense) {
    const loading = await this.loadingController.create({
      translucent: false,
      backdropDismiss: false
    });
    await loading.present();
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
    }
    this.api.newExpense(value, this.budgetId).then((res) => {
      console.log(res);
      this.addExpenseForm.reset();
      loading.dismiss();
      this.modalCtrl.dismiss();
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

  dismiss() {
    this.addExpenseForm.reset();
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
