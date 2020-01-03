var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ProfilePageModule } from './../pages/profile/profile.module';
import { PatentDocumentPageModule } from './../pages/patent-document/patent-document.module';
import { HomePageModule } from './../pages/home/home.module';
import { ClaimsPageModule } from './../pages/claims/claims.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { DescriptionsPageModule } from '../pages/descriptions/descriptions.module';
import { SigninPageModule } from '../pages/signin/signin.module';
import { TitlesPageModule } from '../pages/titles/titles.module';
var TabsPageModule = /** @class */ (function () {
    function TabsPageModule() {
    }
    TabsPageModule = __decorate([
        NgModule({
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
                TitlesPageModule
            ],
            declarations: [TabsPage]
        })
    ], TabsPageModule);
    return TabsPageModule;
}());
export { TabsPageModule };
//# sourceMappingURL=tabs.module.js.map