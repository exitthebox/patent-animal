import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';



import { IonicModule } from '@ionic/angular';

import { CpcSearchPage } from './cpc-search.page';

const routes: Routes = [
  {
    path: '',
    component: CpcSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CpcSearchPage]
})
export class CpcSearchPageModule {
  
}
