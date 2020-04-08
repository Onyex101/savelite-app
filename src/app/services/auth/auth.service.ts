import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { take, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { ILogin, IReg } from './../../interface/dto';
import { environment } from './../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
export const TOKEN_KEY = 'jwt-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiUrl}/user`;

  constructor(
    private http: HttpClient,
    private plt: Platform,
    private storage: Storage
  ) { }

  async isAuthenticated() {
    const token = await this.storage.get(TOKEN_KEY);
    // Check whether the token is expired and return
    // true or false
    return !helper.isTokenExpired(token);
  }

  private getHeader() {
    return new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Expose-Headers': 'true'
    });
  }

  login(credentials: ILogin): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/login`, credentials, { headers: this.getHeader(), observe: 'response' }).subscribe((res) => {
        const token = res.headers.get('Authorization');
        this.storage.set(TOKEN_KEY, token).then(() => {
          resolve(res.body);
        });
      }, (err) => {
        reject(err);
      });
    });
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
