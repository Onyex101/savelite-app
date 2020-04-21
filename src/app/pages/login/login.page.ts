import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from './../../services/common/common.service';
import { ForgotPasswordComponent } from './../../components/forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  validationMessages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 20 characters long.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
    ],
  };

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public common: CommonService
  ) { }

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

  login(): void {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!');
    } else {
      this.common.loadingPresent();
      this.auth.login(this.loginForm.value).then((res) => {
        console.log(res);
        this.loginForm.reset();
        this.common.loadingDismiss();
        this.router.navigateByUrl('/s-menu');
      }).catch((err) => {
        console.log(err);
        this.common.loadingDismiss().then(() => {
          this.common.presentToast(err.error.message);
        });
      });
    }
  }

  openDialog(): void {
    this.loginForm.reset();
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(email => {
      if (email !== undefined) {
        console.log('email', email);
        this.common.loadingPresent();
        this.auth.sendEmail({ email }).then((res) => {
          console.log('email', res);
          this.common.loadingDismiss();
        }).catch((e) => {
          console.log(e);
          this.common.loadingDismiss();
        });
      }
    });
  }

  register(): void {
    this.loginForm.reset();
    this.router.navigate(['register']);
  }

}
