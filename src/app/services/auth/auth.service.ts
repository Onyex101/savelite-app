import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clientID = Config.imgur.IMGUR_CLIENT_ID;
  private imgurEndPoint = Config.imgur.IMGUR_ENDPOINT;
  constructor(
    private http: HttpClient
  ) { }

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
        reject(err);
      });
    });
  }
}
