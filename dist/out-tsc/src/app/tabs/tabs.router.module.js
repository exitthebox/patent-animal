var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
var routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/home/home.module#HomePageModule'
                    }
                ]
            },
            {
                path: 'claims',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/claims/claims.module#ClaimsPageModule'
                    }
                ]
            },
            {
                path: 'descriptions',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/descriptions/descriptions.module#DescriptionsPageModule'
                    }
                ]
            },
            {
                path: 'titles',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/titles/titles.module#TitlesPageModule'
                    }
                ]
            },
            {
                path: 'titles/:id/:name/:address',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/titles/titles.module#TitlesPageModule'
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/profile/profile.module#ProfilePageModule'
                    }
                ]
            },
            {
                path: 'attorneys',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/attorneys/attorneys.module#AttorneysPageModule'
                    }
                ]
            },
            {
                path: 'owners',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/owners/owners.module#OwnersPageModule'
                    }
                ]
            },
            {
                path: 'inventors',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/inventors/inventors.module#InventorsPageModule'
                    }
                ]
            },
            {
                path: 'related-patents/:id',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/related-patents/related-patents.module#RelatedPatentsPageModule'
                    }
                ]
            },
            {
                path: 'patent-docnum-search',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/patent-docnum-search/patent-docnum-search.module#PatentDocnumSearchPageModule'
                    }
                ]
            },
            {
                path: 'help-contact',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/help-contact/help-contact.module#HelpContactPageModule'
                    }
                ]
            },
            {
                path: 'patent-document/:id',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/patent-document/patent-document.module#PatentDocumentPageModule'
                    }
                ]
            },
            {
                path: 'patent-document/:id#relatedPatents',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/patent-document/patent-document.module#PatentDocumentPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];
var TabsPageRoutingModule = /** @class */ (function () {
    function TabsPageRoutingModule() {
    }
    TabsPageRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forChild(routes)
            ],
            exports: [RouterModule]
        })
    ], TabsPageRoutingModule);
    return TabsPageRoutingModule;
}());
export { TabsPageRoutingModule };
//# sourceMappingURL=tabs.router.module.js.map