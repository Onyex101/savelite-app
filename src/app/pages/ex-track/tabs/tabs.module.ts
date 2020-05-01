import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabShareModule } from './tabShare.module';
import { IonicModule } from '@ionic/angular';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabShareModule.forRoot(),
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
