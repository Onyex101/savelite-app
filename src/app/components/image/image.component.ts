import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  imageSrc: string;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
  ) {
    this.imageSrc = this.navParams.get('image');
  }

  ngOnInit() { }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
