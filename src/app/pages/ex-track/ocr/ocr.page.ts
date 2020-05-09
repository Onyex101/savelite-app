import { Component, OnInit } from '@angular/core';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { createWorker } from 'tesseract.js';
import { DataService } from './../../../services/data/data.service';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.page.html',
  styleUrls: ['./ocr.page.scss'],
})
export class OcrPage implements OnInit {

  selectedImage: string;
  budgetId: string;
  ocrResult: string;
  displayProgress = false;
  progress = 0;
  constructor(
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
    private shareData: DataService
  ) { }

  ngOnInit() {
    this.selectedImage = 'https://tesseract.projectnaptha.com/img/eng_bw.png';
    this.shareData.currentBudget.subscribe((budget) => {
      this.budgetId = budget._id;
      console.log(budget);
    });
    // this.doOCR('https://tesseract.projectnaptha.com/img/eng_bw.png');
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
      this.doOCR(this.selectedImage);
    });
  }

  async doOCR(image: any) {
    this.displayProgress = true;
    const worker = createWorker({
      logger: m => {
        if (m.status === 'recognizing text') {
          this.progress = Math.round(m.progress * 100);
        }
        console.log(m);
      },
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(image);
    this.displayProgress = false;
    this.ocrResult = text;
    console.log(text);
    await worker.terminate();
  }

}
