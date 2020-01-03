// import { AbstractPageModule } from './../abstract/abstract.module';
import { AbstractComponent } from './../../components/abstract/abstract.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AttorneysPage } from './attorneys.page';
import { CustomPipesModule } from 'src/app/custom-pipes/custom-pipes.module';

// import { AbstractPageModule } from './../../components/abstract';

const routes: Routes = [
  {
    path: '',
    component: AttorneysPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CustomPipesModule,
    //BrowserAnimationsModule,
    
  ],
  declarations: [
    AttorneysPage,
    AbstractComponent
  ],
  providers:[
    InAppBrowser
  ],
  exports: [
    CustomPipesModule
  ]
})
export class AttorneysPageModule {}
