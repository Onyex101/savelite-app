import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewPlanComponent } from './../../../components/new-plan/new-plan.component';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.page.html',
  styleUrls: ['./savings.page.scss'],
})
export class SavingsPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async newPlan() {
    const modal = await this.modalController.create({
      component: NewPlanComponent,
      backdropDismiss: false,
      swipeToClose: false
    });
    return await modal.present();
  }
}
