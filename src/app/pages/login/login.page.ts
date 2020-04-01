import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './../../components/forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  validation_messages = {
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
    private formBuilder: FormBuilder
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
      console.log(this.loginForm.value);
      // this.router.navigateByUrl('/mode');
      this.router.navigateByUrl('/s-menu');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(email => {
      if (email !== undefined) {
        console.log('email', email);
      }
    });
  }

  register(): void {
    this.router.navigate(['register']);
  }
}
