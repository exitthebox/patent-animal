import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

// import { SentencecasePipe } from '../../sentencecase.pipe';

import { RelatedPatentsPage } from './related-patents.page';

const routes: Routes = [
  {
    path: '',
    component: RelatedPatentsPage
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
    RelatedPatentsPage,
    // SentencecasePipe
  ],
  exports: [
    // SentencecasePipe
  ]
})
export class RelatedPatentsPageModule {}
