import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { InAppBrowserPage } from './in-app-browser.page';


const routes: Routes = [
  {
    path: '',
    component: InAppBrowserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    InAppBrowser
  ],
  declarations: [InAppBrowserPage]
})
export class InAppBrowserPageModule {}
