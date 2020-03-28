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

   return (phoneControl: AbstractControl): {[key: string]: boolean} => {
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
  
    constructor (iso: string, name: string) {
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
          //    - For more types please refer to google libphonenumber repo (https://github.com/googlei18n/libphonenumber/blob/f9e9424769964ce1970c6ed2bd60b25b976dfe6f/javascript/i18n/phonenumbers/phonenumberutil.js#L913)
          example_number_formatted = phoneUtil.format(country_example_number, PNF.NATIONAL);
          // We need to define how are we going to format the phone number
          // You can choose between many formats including:
          //    - NATIONAL
          //    - INTERNATIONAL
          //    - E164
          //    - RFC3966
  
      this.sample_phone = example_number_formatted;
      this.code = "+" + country_example_number.getCountryCode();
    }
  }
