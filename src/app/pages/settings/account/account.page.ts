import { Component, OnInit } from '@angular/core';
import { IUser } from './../../../interface/dto';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { ApiService } from './../../../services/api/api.service';
import { MenuDataService } from './../../../services/data/menu.data.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { EditAccComponent } from './../../../components/edit-acc/edit-acc.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: IUser;
  userDetails = {
    fullname: 'none',
    username: 'none',
    phone_no: 5555,
  };;
  toggleFields = {
    fullname: false,
    username: false,
    phone_no: false,
  };
  profileImage: any;
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
    private camera: Camera,
    private api: ApiService,
    private userData: MenuDataService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.profileImage = 'assets/images/avatar1.png';
  }

  ngOnInit() {
    this.userData.currentUserDetails.subscribe((user) => {
      this.user = user;
      console.log('account', user);
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
      this.profileImage = `data:image/jpeg;base64,${imageData}`;
      this.changeImage();
    });
  }


  async changeImage() {
    const loading = await this.loadingController.create({
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
    try {
      await this.api.deleteImgurImage(this.user.imageDeleteHash);
      const imgDetails = await this.api.sendToImgur(this.profileImage);
      const res = this.api.updateProfileImage(imgDetails);
      console.log(res);
      loading.dismiss();
    } catch (error) {
      loading.dismiss();
      console.log(error);
    }
  }

  openBottomSheet(field: string, data: string | number): void {
    const bottomSheetRef = this._bottomSheet.open(EditAccComponent, {
      data: {input: data, type: field}
    });
    bottomSheetRef.afterDismissed().subscribe((res) => {
      console.log('dismissed.', res);
    });
  }
}
