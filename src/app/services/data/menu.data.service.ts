import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  private userDetails = new BehaviorSubject({
    id: '',
    fullname: '',
    username: '',
    email: '',
    phone_no: '',
    profileImage: 'assets/images/avatar1.png',
    imageDeleteHash: '',
    firebaseToken: ''
  });
  currentUserDetails = this.userDetails.asObservable();

  constructor() {}

  emitUserEvent(data: any) {
    this.userDetails.next(data);
  }

}
