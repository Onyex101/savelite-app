import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api/api.service';
import { Camera } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { DataService } from './../../../services/data/data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  // loading = true;
  selectedImage = '';
  anyImage = false;
  budgetId: string;
  imageList: any;
  constructor(
    private api: ApiService,
    private camera: Camera,
    private shareData: DataService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.shareData.currentBudget.subscribe((budget) => {
      this.budgetId = budget._id;
      this.imageList = budget.images;
      if (this.imageList > 0) {
        this.anyImage = true;
      } else {
        this.anyImage = false;
      }
      console.log(budget);
    });
  }

  getPicture() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      this.uploadImage(this.selectedImage);
    });
  }

  async uploadImage(image: string) {
    const loading = await this.loadingController.create({
      translucent: false,
      backdropDismiss: false
    });
    await loading.present();
    this.api.sendToImgur(image).then((res: any) => {
      console.log(res);
      this.api.postImage(res, this.budgetId).then((r) => {
        console.log(r);
        this.imageList = r.images;
        this.anyImage = true;
        loading.dismiss();
      }).catch((e) => {
        console.log(e);
        loading.dismiss();
      });
    }).catch((e) => {
      console.log(e);
      loading.dismiss();
    });
  }
}
