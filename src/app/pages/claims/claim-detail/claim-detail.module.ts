import { ExpandableComponent } from './../../../components/expandable/expandable.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimDetailPage } from './claim-detail.page';
import { CustomPipesModule } from 'src/app/custom-pipes/custom-pipes.module';



const routes: Routes = [
  {
    path: '',
    component: ClaimDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CustomPipesModule
  ],
  declarations: [
    ClaimDetailPage,
    ExpandableComponent
    
  ],
  exports: [
    CustomPipesModule
  ]
})
export class ClaimDetailPageModule {}
