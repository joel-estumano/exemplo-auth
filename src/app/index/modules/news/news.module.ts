import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './views/news.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
  }
];

@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers:[]
})
export class NewsModule { }