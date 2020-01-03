import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TitlesPage } from './titles.page';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

const routes: Routes = [
  {
    path: '',
    component: TitlesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxPaginationModule
  ],
  declarations: [TitlesPage]
})
export class TitlesPageModule {}
