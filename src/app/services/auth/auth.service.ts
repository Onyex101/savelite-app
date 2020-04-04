import { DataService } from './../data/data.service';
import { ILogin, IReg } from './../../interface/dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { take, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { environment } from './../../../environments/environment';

export const TOKEN_KEY = 'jwt-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiUrl}/user`;
  public user: Observable<any>;

  constructor(
    private http: HttpClient,
    private plt: Platform,
    private storage: Storage
  ) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    let platformObs = from(this.plt.ready());
    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          return true;
        } else {
          return null;
        }
      })
    );
  }

  login(credentials: ILogin) {
    return this.http.post(`${this.url}/login`, credentials).pipe(
      take(1),
      map(res => {
        // Extract the JWT
        return res['token'];
      }),
      switchMap(token => {
        const storageObs = from(this.storage.set(TOKEN_KEY, token));
        return storageObs;
      })
    );
  }

  register(credentials: IReg) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/signup`, credentials).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
    });
  }
}
