import { ProfilePageModule } from './../pages/profile/profile.module';
import { PatentDocumentPageModule } from './../pages/patent-document/patent-document.module';
import { HomePageModule } from './../pages/home/home.module';
import { ClaimsPageModule } from './../pages/claims/claims.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { DescriptionsPageModule } from '../pages/descriptions/descriptions.module';
import { SigninPageModule } from '../pages/signin/signin.module';
import { TitlesPageModule } from '../pages/titles/titles.module';
import { ClassificationPageModule } from '../pages/classification/classification.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ClaimsPageModule,
    DescriptionsPageModule,
    HomePageModule,
    PatentDocumentPageModule,
    ProfilePageModule,
    SigninPageModule,
    TitlesPageModule,
    ClassificationPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
