var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'home', redirectTo: '/tabs/home', pathMatch: 'full' },
    { path: 'attorneys', redirectTo: '/tabs/attorneys', pathMatch: 'full' },
    { path: 'owners', redirectTo: '/tabs/owners', pathMatch: 'full' },
    { path: 'inventors', redirectTo: '/tabs/inventors', pathMatch: 'full' },
    { path: 'related-patents/:id', redirectTo: '/tabs/related-patents/:id', pathMatch: 'full' },
    { path: 'titles/:id/:name/:address', redirectTo: '/tabs/titles/:id/:name/:address', pathMatch: 'full' },
    { path: 'patent-docnum-search', redirectTo: '/tabs/patent-docnum-search', pathMatch: 'full' },
    { path: 'help-contact', redirectTo: '/tabs/help-contact', pathMatch: 'full' },
    { path: 'profile', redirectTo: '/tabs/profile', pathMatch: 'full' },
    { path: 'patent-document/:id', redirectTo: '/tabs/patent-document/:id', pathMatch: 'full' },
    { path: 'patent-document/:id#relatedPatents', redirectTo: '/tabs/patent-document/:id/#relatedPatents', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map