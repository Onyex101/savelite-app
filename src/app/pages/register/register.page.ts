import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator, PhoneValidator, CountryPhone } from './../validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isLinear = true;
  hide = true;
  hide2 = true;
  regForm: FormGroup;
  countryPhoneGroup: FormGroup;
  matchingPassGroup: FormGroup;
  countries: Array<CountryPhone>;
  genders: Array<string>;

  errorMessage = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    ],
    name: [
      { type: 'required', message: 'Last name is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    phone: [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    password: [
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    matching_passwords: [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.countries = [
      new CountryPhone('NG', 'Nigeria'),
      new CountryPhone('US', 'United States'),
    ];
    this.genders = [
      'Male',
      'Female'
    ];
    this.matchingPassGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });
    const country = new FormControl(this.countries[0], Validators.required);
    const phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.countryPhoneGroup = new FormGroup({
      country,
      phone
    });

    this.regForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      gender: [this.genders[0], Validators.required],
      country_phone: this.countryPhoneGroup,
      matching_passwords: this.matchingPassGroup,
      terms: [false, Validators.pattern('true')]
    });
  }

  onSubmit(values?) {
    console.log(values);
    this.router.navigateByUrl('/login');
  }
}
