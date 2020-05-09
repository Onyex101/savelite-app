import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './../home/home.page';
import { GalleryPage } from './../gallery/gallery.page';
import { OcrPage } from './../ocr/ocr.page';
import { TabsPage } from './tabs.page';
import { GalleryPageModule } from './../gallery/gallery.module';
import { OcrPageModule } from './../ocr/ocr.module';
import { HomePageModule } from './../home/home.module';

// const routes: Routes = [
//   {
//     path: 'tabs',
//     component: TabsPage,
//     children: [
//       {
//         path: 'home',
//         loadChildren: () => import('./../home/home.module').then(m => m.HomePageModule)
//       },
//       {
//         path: 'gallery',
//         loadChildren: () => import('./../gallery/gallery.module').then(m => m.GalleryPageModule)
//       },
//       {
//         path: 'ocr',
//         loadChildren: () => import('./../ocr/ocr.module').then(m => m.OcrPageModule)
//       },
//     ]
//   },
//   {
//     path: '',
//     redirectTo: 's-menu/s-menu/tabs/tabs/home'
//   }
// ];

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'gallery',
        component: GalleryPage
      },
      {
        path: 'ocr',
        component: OcrPage
      },
    ]
  },
  {
    path: '',
    redirectTo: 's-menu/s-menu/tabs/tabs/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    HomePageModule,
    OcrPageModule,
    GalleryPageModule
  ],
})
export class TabsPageRoutingModule { }
