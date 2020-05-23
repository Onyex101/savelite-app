import { Router, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { IPlan, IBudget, Iimage, IExpense, IToken } from './../../interface/dto';
import { Storage } from '@ionic/storage';
import { TOKEN_KEY } from './../auth/auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = `${environment.apiUrl}`;

  private clientID = environment.IMGUR_CLIENT_ID;
  private imgurEndPoint = environment.IMGUR_ENDPOINT;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private navCtrl: NavController
  ) { }

  /**
   * create a http header with auth token
   * @param token auth token gotten from storage
   */
  private addHeader(token: string) {
    return new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Expose-Headers': 'true',
      Authorization: token
    });
  }

  /**
   * retrieves Authorization token from storage
   */
  private getToken() {
    return new Promise((resolve, reject) => {
      this.storage.get(TOKEN_KEY).then((val) => {
        resolve(val);
      });
    });
  }

  /**
   * sends the firebase token to the api to be saved in the
   * database
   * @param data token object
   */
  sendToken(data: IToken): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.post(`${this.url}/user/token`, data, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  /**
   * creates a new plan
   * @param data plan details
   */
  createPlan(data: IPlan): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.post(`${this.url}/plan`, data, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  /**
   * retrieves current user plans from the api database
   */
  allPlan(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.get(`${this.url}/plan`, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  /**
   * posts updated plan details to the api database
   * @param data updated plan details
   * @param id plan id
   */
  updatePlan(data: any, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.post(`${this.url}/plan/${id}`, data, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  /**
   * deletes the selected plan
   * @param id plan id
   */
  deletePlan(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.delete(`${this.url}/plan/${id}`, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  /**
   * retrieves encrypted card details
   * @param id card id
   */
  getCard(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.get(`${this.url}/plan/card/${id}`, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  /**
   * POSTs a photo to Imgur in exchange for a link to the image
   * image: base64 encoded image
   */
  sendToImgur(image: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Imgur requires that Base64 images be stripped of the
      // string 'data:image/...;base64,' so we snip it out here.
      image = image.substring(image.indexOf('base64,') + 'base64,'.length);
      // Imgur requires this string for authentication
      // It looks like: 'Client-ID XXXXXXXXXXXX' when sent
      const auth = `Client-ID ${this.clientID}`;
      // Imgur wants an encoded form-data body
      // So we'll give it to them -> just append a key-value pair
      // with our 'snipped' base64 image.
      const body = new FormData();
      body.append('image', image);
      // Angular was very annoying in sending out a form-data request
      // using HttpModule (I spent 3 hours trying to solve it). But, instead, we
      // can send a request the old fashioned JavaScript way.
      // Create a POST request and authorize us via our auth variable from above
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.imgurEndPoint, true);
      xhr.setRequestHeader('Authorization', auth);

      // Once the request is sent, we check to see if it's successful
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          // 200 is a successful status code, meaning it worked!
          if (xhr.status === 200) {
            // We can grab the link from our HTTP response and call it back
            const data = JSON.parse(xhr.response).data;
            if (data != null) {
              resolve(data);
            }
          } else if (xhr.status >= 400) {
            // If we receive a bad request error, we'll send our failure callback.
            reject();
          }
        }
      };
      // This synchronously sends our form-data body.
      xhr.send(body);
    });
  }

  deleteImgurImage(imageDeleteHash: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Client-ID ${this.clientID}`
        })
      };
      this.http.delete(`${this.imgurEndPoint}/${imageDeleteHash}`, httpOptions).subscribe((res) => {
        resolve(res);
      }, (err) => {
        this.sessionExpired(err);
        reject(err);
      });
    });
  }

  updateProfileImage(data: any) {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.post(`${this.url}/user/image`, data, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  postImage(data: Iimage, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.post(`${this.url}/expense/budget/image/${id}`, data, { headers: this.addHeader(val), observe: 'response' })
        .subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  deleteImage(bId: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        // tslint:disable-next-line: max-line-length
        this.http.delete(`${this.url}/expense/budget/image/${bId}/${id}`, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  allBudgets(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.get(`${this.url}/expense/budgets`, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  newBudget(data: IBudget): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.post(`${this.url}/expense/budget`, data, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  editBudget(data: IBudget, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        // tslint:disable-next-line: max-line-length
        this.http.post(`${this.url}/expense/budget/edit/${id}`, data, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  newExpense(data: IExpense, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.post(`${this.url}/expense/${id}`, data, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  editExpense(data: IExpense, bId: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.post(`${this.url}/expense/${bId}/${id}`, data, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  deleteExpense(bId: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken().then((val: any) => {
        this.http.delete(`${this.url}/expense/${bId}/${id}`, { headers: this.addHeader(val), observe: 'response' }).subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          this.sessionExpired(err);
          reject(err);
        });
      });
    });
  }

  private sessionExpired(error: HttpErrorResponse) {
    if (error.status === 401 && error.statusText === 'Unauthorized') {
      const navigationExtras: NavigationExtras = {
        state: {
          authentication: 'Expired'
        }
      };
      this.navCtrl.setDirection('root');
      this.router.navigate(['login'], navigationExtras);
    }
  }
}
