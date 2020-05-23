import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { BudgetModalComponent } from './../../../components/budget-modal/budget-modal.component';
import { DetailsComponent } from './../../../components/details/details.component';
import { DataService } from './../../../services/data/data.service';
import { MenuDataService } from './../../../services/data/menu.data.service';
import { IBudget, IExpense } from './../../../interface/dto';
import { ApiService } from './../../../services/api/api.service';
import { AddExpenseComponent } from './../../../components/add-expense/add-expense.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  anyExpense = false;
  spinner = true;
  b: any;
  allBudgets: IBudget[];
  diag = false;
  budget = 0;
  expense = 0;
  balance = 0;
  expenseList: IExpense[];
  chart: string;
  storageId: string;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    public mainShare: DataService,
    public modalController: ModalController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    private storage: Storage,
    private shareData: DataService,
    private menuData: MenuDataService,
  ) {
    this.allBudgets = [];
    this.storage.get('chartTYPE').then((res) => {
      this.chart = res;
    });
  }

  async ngOnInit() {
    this.storageId = await this.storage.get('BudgetId');
    console.log('id store', this.storageId);
    if (this.storageId === null) {
      await this.getBudgets();
    } else {
      await this.getBudgets(true);
    }
    this.menuData.currentChartType.subscribe((res) => {
      this.chart = res;
      console.log('chart update', this.chart);
    });
  }

  async getBudgets(Id?: boolean) {
    this.anyExpense = false;
    this.spinner = true;
    try {
      const res = await this.apiService.allBudgets();
      console.log(res);
      if (res.length > 0) {
        if (Id === true) {
           res.forEach((item: any) => {
            if (this.storageId === item._id) {
              this.b = item;
            }
          });
        } else {
          this.b = res[0];
        }
        console.log(this.b);
        this.budget = this.b.budget;
        this.storage.set('BudgetId', this.b._id);
        this.shareData.emitBudgetEvent(this.b);
        this.expenseList = this.b.expenses;
        if (this.expenseList.length > 0) {
          this.anyExpense = true;
          this.calculate();
        }
        this.spinner = false;
      } else {
        this.spinner = false;
        this.anyExpense = false;
      }
      this.allBudgets = res;
    } catch (err) {
      console.log(err);
    }
  }

  async delExp(id: string) {
    const loading = await this.loadingController.create({
      translucent: false,
      backdropDismiss: false
    });
    await loading.present();
    try {
      const res = await this.apiService.deleteExpense(this.b._id, id);
      console.log(res);
      this.expenseList = res;
      this.calculate();
    } catch (error) {
      console.log(error);
    }
    loading.dismiss();
  }

  newBudget(): void {
    const dialogRef = this.dialog.open(BudgetModalComponent, {
      width: '300px',
      data: { edit: false }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result !== undefined || null) {
        const loading = await this.loadingController.create({
          translucent: false,
          backdropDismiss: false
        });
        await loading.present();
        this.apiService.newBudget(result).then((res) => {
          console.log(res);
          if (res.msg) {
            this.presentToast(res.msg.message);
          } else {
            this.allBudgets.push(res);
            this.allBudgets.forEach((item) => {
              if (item._id === res._id) {
                this.b = item;
              }
            });
            this.budget = this.b.budget;
            this.storage.set('BudgetId', this.b._id);
            this.shareData.emitBudgetEvent(this.b);
            this.expenseList = this.b.expenses;
            if (this.expenseList.length > 0) {
              this.anyExpense = true;
              this.calculate();
            } else {
              this.anyExpense = false;
            }
          }
          loading.dismiss();
        }).catch((err) => {
          console.log(err);
          loading.dismiss();
        });
      }
    });
  }

  editBudget() {
    const dialogRef = this.dialog.open(BudgetModalComponent, {
      width: '300px',
      data: {
        edit: true,
        details: {
          budgetName: this.b.budgetName,
          budget: this.b.budget
        }
      }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(result);
      console.log(this.b._id);
      if (result !== undefined || null) {
        const loading = await this.loadingController.create({
          translucent: false,
          backdropDismiss: false
        });
        await loading.present();
        this.apiService.editBudget(result, this.b._id).then(async (res) => {
          console.log(res);
          await this.getBudgets(true);
          loading.dismiss();
        }).catch((err) => {
          console.log(err);
          loading.dismiss();
        });
      }
    });
  }

  async openExpense() {
    if (this.b === undefined) {
      this.newBudget();
    } else {
      const modal = await this.modalController.create({
        component: AddExpenseComponent,
        componentProps: {
          id: this.b._id,
        }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      console.log('modal closed', data);
      if (data === undefined) {
        this.storageId = this.b._id;
        await this.getBudgets(true);
      }
    }
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
    this.mainShare.changeData(data);
  }

  async editExpense(expense: IExpense) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        expense,
        id: this.b._id,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log('modal closed', data);
    if (data === undefined) {
      this.storageId = this.b._id;
      await this.getBudgets(true);
    }
  }

  private isEmpty(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      buttons: ['OK']
    });
    toast.present();
  }

  budgetSelect(event) {
    console.log(this.b);
    this.budget = this.b.budget;
    this.storage.set('BudgetId', this.b._id);
    this.shareData.emitBudgetEvent(this.b);
    this.expenseList = this.b.expenses;
    if (this.expenseList.length > 0) {
      this.calculate();
      this.anyExpense = true;
    } else {
      this.anyExpense = false;
    }
  }

  async doRefresh(event) {
    try {
      await this.getBudgets();
      event.target.complete();
    } catch (error) {
      console.log(error);
    }
  }

}
