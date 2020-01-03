var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { FilterPipe } from './../../../filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PatentDocumentPage } from './patent-document.page';
import { SentencecasePipe } from '../../sentencecase.pipe';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
var routes = [
    {
        path: '',
        component: PatentDocumentPage
    }
];
var PatentDocumentPageModule = /** @class */ (function () {
    function PatentDocumentPageModule() {
    }
    PatentDocumentPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgxPageScrollCoreModule,
                NgxPageScrollModule
            ],
            declarations: [
                PatentDocumentPage,
                SentencecasePipe,
                FilterPipe
            ],
            exports: [
                SentencecasePipe,
                FilterPipe
            ]
        })
    ], PatentDocumentPageModule);
    return PatentDocumentPageModule;
}());
export { PatentDocumentPageModule };
//# sourceMappingURL=patent-document.module.js.map