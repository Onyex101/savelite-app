import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SMenuPage } from './s-menu.page';

const routes: Routes = [
  {
    path: 's-menu',
    component: SMenuPage,
    children: [
      {
        path: 'dash',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'plans',
        loadChildren: () => import('./plans/plans.module').then( m => m.PlansPageModule)
      },
      {
        path: 'new-budget',
        loadChildren: () => import('./new-budget/new-budget.module').then( m => m.NewBudgetPageModule)
      },
      {
        path: 'plan',
        loadChildren: () => import('./plan/plan.module').then( m => m.PlanPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 's-menu/dash'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class SMenuPageRoutingModule {}
