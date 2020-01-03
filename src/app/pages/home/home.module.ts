import { CreateComponent } from './../../components/ngrx/create/create.component';
import { ReadComponent } from './../../components/ngrx/read/read.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  
  ],
  declarations: [
    HomePage,
    ReadComponent,
    CreateComponent
  ]
})
export class HomePageModule {}
