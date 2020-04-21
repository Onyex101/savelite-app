import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewPlanComponent } from './../../../components/new-plan/new-plan.component';
import { PlanDetailComponent } from './../../../components/plan-detail/plan-detail.component';
import { ApiService } from './../../../services/api/api.service';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.page.html',
  styleUrls: ['./savings.page.scss'],
})
export class SavingsPage implements OnInit {

  plan = false;
  plans: any[];
  loading = true;
  TtlAmt = 0;
  TotalTgtAmt = 0;
  TotalPercentage = 0;

  constructor(
    public modalController: ModalController,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getPlans();
  }

  getPlans() {
    this.api.allPlan().then((res) => {
      res.forEach((item) => {
        // tslint:disable-next-line: radix
        const amt = parseInt(item.card.amount);
        this.TtlAmt += amt;
        // tslint:disable-next-line: radix
        const trgtAmt = parseInt(item.targetAmount);
        this.TotalTgtAmt += trgtAmt;
        item.percentage = (amt / trgtAmt) * 100;
      });
      this.TotalPercentage = (this.TtlAmt / this.TotalTgtAmt) * 100;
      console.log(res);
      this.plans = res;
      this.plan = true;
      this.loading = false;
    }).catch((err) => {
      console.log(err);
    });
  }

  async newPlan() {
    const modal = await this.modalController.create({
      component: NewPlanComponent,
      backdropDismiss: false,
      swipeToClose: false
    });
    return await modal.present();
  }

  async editPlan(plan: any) {
    const modal = await this.modalController.create({
      component: PlanDetailComponent,
      componentProps: { plan },
      backdropDismiss: false,
      swipeToClose: false
    });
    return await modal.present();
  }

  doRefresh(event: any) {
    this.getPlans();
    event.target.complete();
  }
}
