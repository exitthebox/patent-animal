import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CustomPipesModule } from 'src/app/custom-pipes/custom-pipes.module';

import { CodeSearchPage } from './code-search.page';

const routes: Routes = [
  {
    path: '',
    component: CodeSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CustomPipesModule,
  ],
  declarations: [CodeSearchPage],
  exports:[
    CustomPipesModule,
  ]
})
export class CodeSearchPageModule {}
