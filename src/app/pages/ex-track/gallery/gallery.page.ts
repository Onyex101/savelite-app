import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api/api.service';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  selectedImage = '';
  constructor(
    private api: ApiService,
    private camera: Camera
  ) { }

  ngOnInit() {
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

  uploadImage(image: string) {
    this.api.sendToImgur(image).then((res) => {
      console.log(res);
      // this.regForm.value.profileImage = res;
    }).catch((e) => {
      console.log(e);
    });
  }
}
