import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'mode',
    loadChildren: () => import('./pages/mode/mode.module').then( m => m.ModePageModule)
  },
  {
    path: 's-menu',
    loadChildren: () => import('./pages/s-menu/s-menu.module').then( m => m.SMenuPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/ex-track/tabs/tabs.module').then( m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
