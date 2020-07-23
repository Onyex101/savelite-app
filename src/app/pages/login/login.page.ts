import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../services/auth/auth.service';
import { ForgotPasswordComponent } from './../../components/forgot-password/forgot-password.component';
import { Storage } from '@ionic/storage';
import { ApiService } from './../../services/api/api.service';
import { ErrorMessages } from './../validation';
import { IUser } from './../../interface/dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  validationMessages = ErrorMessages.loginError;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    private storage: Storage
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        const authenticated = this.router.getCurrentNavigation().extras.state.authentication;
        if (authenticated === 'Expired') {
          this.presentAlert();
        }
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    });
  }

  get formControls() { return this.loginForm.controls; }

  async login() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!');
    } else {
      const loading = await this.loadingController.create({
        translucent: false,
        backdropDismiss: false
      });
      await loading.present();
      try {
        const res: IUser = await this.auth.login(this.loginForm.value);
        const token = await this.storage.get('FIREBASE_TOKEN');
        if ((res.firebaseToken === 'token') || (res.firebaseToken !== token)) {
          const t = await this.api.sendToken({token});
          console.log('token sent to api', t);
        }
        this.loginForm.reset();
        loading.dismiss();
        const navExtras: NavigationExtras = {
          state: {
            user: res,
          }
        };
        this.router.navigate(['s-menu'], navExtras);
      } catch (err) {
        console.log(err);
        loading.dismiss().then(() => {
          this.presentToast(err.error.message);
        });
      }
    }
  }

  openDialog(): void {
    this.loginForm.reset();
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async (email) => {
      if (email !== undefined) {
        console.log('email', email);
        const loading = await this.loadingController.create({
          translucent: false,
          backdropDismiss: false
        });
        await loading.present();
        this.auth.sendEmail({ email }).then((res) => {
          console.log('email', res);
          loading.dismiss();
        }).catch((e) => {
          console.log(e);
          loading.dismiss();
          this.presentToast(e.error.msg);
        });
      }
    });
  }

  register(): void {
    this.loginForm.reset();
    this.router.navigate(['register']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Session expired, please login again',
      buttons: ['OK']
    });

    await alert.present();
  }
}
