import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OcrPageRoutingModule } from './ocr-routing.module';
import { OcrPage } from './ocr.page';
import { ProgressBarModule } from 'angular-progress-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OcrPageRoutingModule,
    ProgressBarModule
  ],
  declarations: [OcrPage]
})
export class OcrPageModule {}
