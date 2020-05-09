import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator, PhoneValidator, CountryPhone, ErrorMessages } from './../validation';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { AuthService } from './../../services/auth/auth.service';
import { ApiService } from './../../services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  selectedImage: string;
  regForm: FormGroup;
  countryPhoneGroup: FormGroup;
  matchingPassGroup: FormGroup;
  countries: Array<CountryPhone>;
  genders: Array<string>;
  profileImage: any;
  imgDelHash: any;
  imageSet = false;

  errorMessage = ErrorMessages.registerError;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
    private camera: Camera,
    private auth: AuthService,
    private api: ApiService
  ) {
    this.selectedImage = 'assets/images/avatar.svg';
  }

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

  async selectSource() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          icon: 'image-outline',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          icon: 'camera-outline',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      this.uploadImage(this.selectedImage);
    });
  }

  uploadImage(image: string) {
    this.api.sendToImgur(image).then((res: any) => {
      console.log(res);
      this.profileImage = res.link;
      this.imgDelHash = res.deletehash;
      this.imageSet = true;
    }).catch((e) => {
      console.log(e);
    });
  }

  async onSubmit(values?) {
    const loading = await this.loadingController.create({
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
    if (this.imageSet === true) {
      values.profileImage = this.profileImage;
      values.imgDelHash = this.imgDelHash;
    }
    console.log('register form', values);
    this.auth.register(values).then((res) => {
      console.log(res);
      this.regForm.reset();
      loading.dismiss();
      this.router.navigateByUrl('/login');
    }).catch((e) => {
      console.log(e);
      loading.dismiss();
    });
  }
}
