import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SMenuPage } from './s-menu.page';

const routes: Routes = [
  {
    path: 's-menu',
    component: SMenuPage,
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('../ex-track/tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'savings',
        loadChildren: () => import('./savings/savings.module').then( m => m.SavingsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 's-menu/tabs/tabs/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class SMenuPageRoutingModule { }
