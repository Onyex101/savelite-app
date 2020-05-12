import { Iimage } from './../../../interface/dto';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ApiService } from './../../../services/api/api.service';
import { Camera } from '@ionic-native/camera/ngx';
import { DataService } from './../../../services/data/data.service';
import { ImageComponent } from './../../../components/image/image.component';

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
  imageList: Iimage[];
  deleteToggle = false;
  imageCopy: any;

  constructor(
    private api: ApiService,
    private camera: Camera,
    private shareData: DataService,
    public modalController: ModalController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.shareData.currentBudget.subscribe((budget) => {
      this.imageList = [];
      this.budgetId = budget._id;
      if (budget.images.length > 0) {
        budget.images.forEach((img) => {
          img.select = false;
        });
        this.anyImage = true;
        this.imageList = budget.images;
        this.imageCopy = JSON.parse(JSON.stringify(this.imageList));
      } else {
        this.anyImage = false;
      }
      // console.log('budget page', this.imageList);
    });
  }

  getPicture() {
    this.camera.getPicture({
      quality: 60,
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
      this.api.postImage(res, this.budgetId).then((r) => {
        // console.log(r);
        this.shareData.emitBudgetEvent(r);
        loading.dismiss();
      }).catch((e) => {
        // console.log(e);
        loading.dismiss();
      });
    }).catch((e) => {
      // console.log(e);
      loading.dismiss();
    });
  }

  toggle() {
    this.deleteToggle = !this.deleteToggle;
    // this.imageList = [...this.imageCopy];
  }

  selectImage(img: any) {
    this.imageList.forEach((i) => {
      if (i._id === img._id) {
        i.select = !i.select;
      }
    });
  }

  deleteImages() {
    this.imageList.forEach(async (image) => {
      if (image.select === true) {
        try {
          await this.api.deleteImgurImage(image.deletehash);
          const res = await this.api.deleteImage(this.budgetId, image._id);
          // console.log(res);
          this.shareData.emitBudgetEvent(res);
        } catch (error) {
          // console.log(error);
        }
      }
    });
  }

  async viewImage(img: Iimage) {
    const modal = await this.modalController.create({
      component: ImageComponent,
      componentProps: {
        image: img.link
      }
    });
    await modal.present();
  }
}
