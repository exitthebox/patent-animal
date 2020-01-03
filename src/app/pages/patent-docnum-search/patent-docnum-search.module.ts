import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PatentDocnumSearchPage } from './patent-docnum-search.page';
import { CustomPipesModule } from 'src/app/custom-pipes/custom-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: PatentDocnumSearchPage
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
  declarations: [PatentDocnumSearchPage],
  exports: [
    CustomPipesModule
  ]
})
export class PatentDocnumSearchPageModule {}
