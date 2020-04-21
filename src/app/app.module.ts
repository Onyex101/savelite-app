import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService, TOKEN_KEY } from './services/auth/auth.service';
import { ApiService } from './services/api/api.service';
import { MaterialModule } from './material.module';
import { ExpenseService } from './services/expenses/expense.service';
import { CommonService } from './services/common/common.service';
// plugins
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { DataService } from './services/data/data.service';
import { Network } from '@ionic-native/network/ngx';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ExpenseService,
    Camera,
    Network,
    JwtHelperService,
    DataService,
    ApiService,
    AuthService,
    CommonService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
