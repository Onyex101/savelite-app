import { ApiService } from './../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ModalController, IonSlides } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ErrorMessages } from './../../pages/validation';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.scss'],
})
export class NewPlanComponent implements OnInit {

  @ViewChild('slides', { read: IonSlides, static: false }) slides: IonSlides;
  planForm: FormGroup;
  cardForm: FormGroup;
  duration: Array<string>;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  planError = ErrorMessages.planError;

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private modalCtrl: ModalController,
    private api: ApiService
  ) {
    this.duration = ['monthly', 'weekly', 'daily'];
  }

  ngOnInit() {
    this.initForm();
  }

  lockPrevSlide() {
    if (this.planForm.valid) {
      this.slides.lockSwipeToPrev(true);
    }
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
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
    this.planForm.value.card = this.cardForm.value;
    console.log(this.planForm.value);
    this.api.createPlan(this.planForm.value).then((res) => {
      console.log(res);
      this.planForm.reset();
      this.cardForm.reset();
      loading.dismiss();
    }).catch((e) => {
      console.log(e);
    });
  }

  next() {
    console.log(this.planForm.value);
    this.slides.slideNext();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
