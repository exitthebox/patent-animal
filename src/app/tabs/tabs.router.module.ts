import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../pages/home/home.module#HomePageModule',
            
          }
        ]
      },
      {
        path: 'claims',
        children: [
          {
            path: '',
            loadChildren: '../pages/claims/claims.module#ClaimsPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'claim-detail/:id',
        children: [
          {
            path: '',
            loadChildren: '../pages/claims/claim-detail/claim-detail.module#ClaimDetailPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'descriptions',
        children: [
          {
            path: '',
            loadChildren: '../pages/descriptions/descriptions.module#DescriptionsPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'titles',
        children: [
          {
            path: '',
            loadChildren: '../pages/titles/titles.module#TitlesPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'titles/:id/:name/:address',
        children: [
          {
            path: '',
            loadChildren: '../pages/titles/titles.module#TitlesPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      // {
      //   path: 'profile',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: '../pages/in-app-browser/in-app-browser.module#InAppBrowserPageModule'
      //     }
      //   ]
      // },
      {
        path: 'attorneys',
        children: [
          {
            path: '',
            loadChildren: '../pages/attorneys/attorneys.module#AttorneysPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'owners',
        children: [
          {
            path: '',
            loadChildren: '../pages/owners/owners.module#OwnersPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'inventors',
        children: [
          {
            path: '',
            loadChildren: '../pages/inventors/inventors.module#InventorsPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'related-patents/:id',
        children: [
          {
            path: '',
            loadChildren: '../pages/related-patents/related-patents.module#RelatedPatentsPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },      
      {
        path: 'patent-docnum-search',
        children: [
          {
            path: '',
            loadChildren: '../pages/patent-docnum-search/patent-docnum-search.module#PatentDocnumSearchPageModule',
            canActivate: [AuthGuard]
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
        path: 'classification',
        children: [
          {
            path: '',
            loadChildren: '../pages/classification/classification.module#ClassificationPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'code-search/:id',
        children: [
          {
            path: '',
            loadChildren: '../pages/classification/code-search/code-search.module#CodeSearchPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'cpc-results',
        children: [
          {
            path: '',
            loadChildren: '../pages/classification/cpc-results/cpc-results.module#CpcResultsPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'patent-document/:id',
        children: [
          {
            path: '',
            loadChildren: '../pages/patent-document/patent-document.module#PatentDocumentPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'patent-document/:id#relatedPatents',
        children: [
          {
            path: '',
            loadChildren: '../pages/patent-document/patent-document.module#PatentDocumentPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ],
    
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
