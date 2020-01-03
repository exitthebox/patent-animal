import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DragulaModule } from 'ng2-dragula';

import { GraphdropPage } from './graphdrop.page';

const routes: Routes = [
  {
    path: '',
    component: GraphdropPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DragulaModule,
  ],
  
  declarations: [GraphdropPage]
})
export class GraphdropPageModule {}
