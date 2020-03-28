import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'add-expense',
        loadChildren: () => import('./../add-expense/add-expense.module').then(m => m.AddExpensePageModule)
      },
      {
        path: 'ocr',
        loadChildren: () => import('./../ocr/ocr.module').then( m => m.OcrPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
