import { Component, OnInit } from '@angular/core';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.page.html',
  styleUrls: ['./ocr.page.scss'],
})
export class OcrPage implements OnInit {

  selectedImage: string;
  imageText: string;
  constructor(
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
    private ocr: OCR
  ) { }

  ngOnInit() {
  }

  async selectSource() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
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
    });
  }

  async recognizeImage() {
    this.ocr.recText(OCRSourceType.BASE64, this.selectedImage)
      .then((res: OCRResult) => console.log(JSON.stringify(res)))
      .catch((error: any) => console.error(error));
  }
}
