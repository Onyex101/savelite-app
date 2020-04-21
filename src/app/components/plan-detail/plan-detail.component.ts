import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from './../../pages/validation';
import { IPlan } from './../../interface/dto';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss'],
})
export class PlanDetailComponent implements OnInit {

  plan: IPlan;
  planForm: FormGroup;
  cardForm: FormGroup;
  planError = ErrorMessages.planError;
  duration: Array<string>;

  constructor(
    private modalCtrl: ModalController,
    private navParam: NavParams,
    private formBuilder: FormBuilder,
  ) {
    this.plan = this.navParam.get('plan');
    console.log(this.plan);
    this.duration = ['monthly', 'weekly', 'daily'];
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.planForm = this.formBuilder.group({
      planName: ['', Validators.compose([
        Validators.required,
      ])],
      periodicAmount: ['', Validators.compose([
        Validators.required,
        Validators.min(2)
      ])],
      targetAmount: ['', Validators.compose([
        Validators.required,
        Validators.min(2)
      ])],
      duration: ['', Validators.compose([
        Validators.required,
      ])],
    });

    this.planForm.controls.planName.setValue(this.plan.planName);
    this.planForm.controls.periodicAmount.setValue(this.plan.periodicAmount);
    this.planForm.controls.targetAmount.setValue(this.plan.targetAmount);
    this.planForm.controls.duration.setValue(this.plan.duration);

    this.cardForm = this.formBuilder.group({
      firstname: ['', Validators.compose([
        Validators.required,
      ])],
      lastname: ['', Validators.compose([
        Validators.required,
      ])],
      card_no: ['', Validators.compose([
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(15)
      ])],
      expiry_date: ['', Validators.compose([
        Validators.required,
      ])],
      cvv: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ])],
      pin: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ])],
    });

    this.cardForm.controls.firstname.setValue(this.plan.card.firstname);
    this.cardForm.controls.lastname.setValue(this.plan.card.lastname);
    this.cardForm.controls.card_no.setValue(this.plan.card.card_no);
    this.cardForm.controls.expiry_date.setValue(this.plan.card.expiry_date);
    this.cardForm.controls.cvv.setValue(this.plan.card.cvv);
    this.cardForm.controls.pin.setValue(this.plan.card.pin);

  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  next() {

  }

  onSubmit() {

  }
}
