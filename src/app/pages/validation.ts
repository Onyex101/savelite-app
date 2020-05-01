import { FormControl, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import libphonenumber from 'google-libphonenumber';

export class PasswordValidator {
  static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;
    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];
        if (val === undefined) {
          val = control.value;
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      areEqual: true
    }
  }
}

export class PhoneValidator {

  static validCountryPhone = (countryControl: AbstractControl): ValidatorFn => {
    let subscribe = false;

    return (phoneControl: AbstractControl): { [key: string]: boolean } => {
      if (!subscribe) {
        subscribe = true;
        countryControl.valueChanges.subscribe(() => {
          phoneControl.updateValueAndValidity();
        });
      }
      if (phoneControl.value !== '') {
        try {
          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          let phoneNumber = '' + phoneControl.value + '',
            region = countryControl.value.iso,
            number = phoneUtil.parse(phoneNumber, region),
            isValidNumber = phoneUtil.isValidNumber(number);
          if (isValidNumber) {
            return null;
          }
        } catch (e) {
          return {
            validCountryPhone: true
          };
        }
        return {
          validCountryPhone: true
        };
      } else {
        return null;
      }
    };
  }
}

export class CountryPhone {
  iso: string;
  name: string;
  code: string;
  sample_phone: string;

  constructor(iso: string, name: string) {
    this.iso = iso;
    this.name = name;

    let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance(),
      PNF = libphonenumber.PhoneNumberFormat,
      PNT = libphonenumber.PhoneNumberType,
      country_example_number = phoneUtil.getExampleNumberForType(this.iso, PNT.MOBILE),
      // We need to define what kind of country phone number type we are going to use as a mask.
      // You can choose between many types including:
      //    - FIXED_LINE
      //    - MOBILE
      // tslint:disable-next-line: max-line-length
      //    - For more types please refer to google libphonenumber repo (https://github.com/googlei18n/libphonenumber/blob/f9e9424769964ce1970c6ed2bd60b25b976dfe6f/javascript/i18n/phonenumbers/phonenumberutil.js#L913)
      example_number_formatted = phoneUtil.format(country_example_number, PNF.NATIONAL);
    // We need to define how are we going to format the phone number
    // You can choose between many formats including:
    //    - NATIONAL
    //    - INTERNATIONAL
    //    - E164
    //    - RFC3966

    this.sample_phone = example_number_formatted;
    this.code = '+' + country_example_number.getCountryCode();
  }
}

export const ErrorMessages = {

  loginError: {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 20 characters long.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
    ],
  },

  registerError: {
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
  },

  planError: {
    planName: [
      { type: 'required', message: 'Plan name is required.' },
    ],
    periodicAmount: [
      { type: 'required', message: 'Periodic amount is required.' },
      { type: 'min', message: 'amount must be at least 4 characters long.' },
    ],
    targetAmount: [
      { type: 'required', message: 'Target amount is required.' },
      { type: 'min', message: 'amount must be at least 4 characters long.' },
    ],
    firstname: [
      { type: 'required', message: 'Your First name is required.' }
    ],
    lastname: [
      { type: 'required', message: 'Your last name is required.' }
    ],
    card_no: [
      { type: 'required', message: 'card number is required.' },
      { type: 'min', message: 'card no cannot be less than 15 characters long.' },
      { type: 'max', message: 'card no name cannot be more than 15 characters long.' },
    ],
    expiry_date: [
      { type: 'required', message: 'expiry date is required.' }
    ],
    cvv: [
      { type: 'required', message: 'card cvv is required.' },
      { type: 'min', message: 'cvv cannot be less than 4 characters long.' },
      { type: 'max', message: 'cvv cannot be more than 4 characters long.' },
    ],
    pin: [
      { type: 'required', message: 'card pin is required.' },
      { type: 'min', message: 'pin cannot be less than 4 characters long.' },
      { type: 'max', message: 'pin cannot be more than 4 characters long.' },
    ],
  },

  addExpenseError: {
    date: [
      { type: 'required', message: 'Please enter a Date.' },
    ],
    amount: [
      { type: 'required', message: 'Please enter an amount.' },
      { type: 'pattern', message: 'Please enter a positive amount' },
    ],
    descr: [
      { type: 'required', message: 'Description is required.' },
    ],
  },

  budgetError: {
    budgetName: [
      { type: 'required', message: 'Please enter a name.' },
    ],
    budget: [
      { type: 'required', message: 'Please enter an amount.' },
      { type: 'pattern', message: 'Please enter a positive amount' },
    ],
  },

  editExpenseError: {
    date: [
      { type: 'required', message: 'Please enter a Date.' },
    ],
    amount: [
      { type: 'required', message: 'Please enter an amount.' },
      { type: 'pattern', message: 'Please enter a positive amount' },
    ],
    descr: [
      { type: 'required', message: 'Description is required.' },
    ],
  }

};
