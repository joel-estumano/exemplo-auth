import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/guards/auth.guard';
import { IndexComponent } from './index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./modules/account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./modules/news/news.module').then((m) => m.NewsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'business',
        loadChildren: () =>
          import('./modules/business/business.module').then((m) => m.BusinessModule),
        canActivate: [AuthGuard],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
