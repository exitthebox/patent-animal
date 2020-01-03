import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PatentDocumentPage } from './patent-document.page';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core'
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CustomPipesModule } from 'src/app/custom-pipes/custom-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: PatentDocumentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    CustomPipesModule,
    // TitleCasePipe
  ],
  providers:[
    InAppBrowser
  ],
  declarations: [
    PatentDocumentPage,
    
  ],
  exports: [
    CustomPipesModule,
    // TitleCasePipe
  ]
})
export class PatentDocumentPageModule {}
