import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  private userDetails = new BehaviorSubject({
    id: '',
    fullname: '',
    username: 'User Name',
    email: '',
    phone_no: '',
    profileImage: 'assets/images/avatar1.png',
    imageDeleteHash: '',
    firebaseToken: ''
  });
  currentUserDetails = this.userDetails.asObservable();

  private chartType;
  currentChartType;

  constructor(
    private plt: Platform,
    private storage: Storage
  ) {
    this.plt.ready().then(() => {
      this.storage.get('chartTYPE').then((res) => {
        this.chartType = new BehaviorSubject(res);
        this.currentChartType = this.chartType.asObservable();
      });
    });
  }

  emitUserEvent(data: any) {
    this.userDetails.next(data);
  }

  emitChartEvent(data: string) {
    this.chartType.next(data);
  }

}
