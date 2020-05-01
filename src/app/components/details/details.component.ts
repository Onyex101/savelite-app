import { ApiService } from './../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { IExpense } from 'src/app/interface/dto';
import { ErrorMessages } from './../../pages/validation';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  expense: IExpense;
  editExpenseForm: FormGroup;
  categories: Array<string>;
  budgetId: string;
  edit = false;
  errorMessage = ErrorMessages.editExpenseError;

  constructor(
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public loadingController: LoadingController,
    private api: ApiService
  ) {
    this.categories = ['Health', 'Food', 'Education', 'Transport', 'Entertainment', 'Shopping', 'Others'];
    this.expense = this.navParams.get('expense');
    this.budgetId = this.navParams.get('id');
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

  toggleEdit() {
    this.edit = !this.edit;
    // if (this.edit) {
    //   this.editExpenseForm.enable();
    // } else {
    //   this.editExpenseForm.disable();
    // }
  }

  async onSubmit(value) {
    const loading = await this.loadingController.create({
      translucent: false,
      backdropDismiss: false
    });
    await loading.present();
    value.icon = this.expense.icon;
    this.api.editExpense(value, this.budgetId, this.expense._id).then(() => {
      this.editExpenseForm.reset();
      loading.dismiss();
      this.modalCtrl.dismiss();
    }).catch((e) => {
      console.log(e);
      loading.dismiss();
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
