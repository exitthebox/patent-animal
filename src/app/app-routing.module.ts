import { SignoutComponent } from './components/signout/signout.component';
import { AuthGuard } from './auth.guard';
import { CallbackComponent } from './components/callback/callback.component';
import { ProfileComponent } from './components/profile/profile.component';

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';

// import { Neo4jService } from './services/neo4j.service'

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
  },
  {
    path: 'home',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'attorneys',
    redirectTo: '/tabs/attorneys',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'owners',
    redirectTo: '/tabs/owners',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'inventors',
    redirectTo: '/tabs/inventors',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },

  {
    path: 'related-patents/:id',
    redirectTo: '/tabs/related-patents/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'titles/:id/:name/:address',
    redirectTo: '/tabs/titles/:id/:name/:address',
    pathMatch: 'full',
  //  canActivate: [AuthGuard]
  },
  {
    path: 'patent-docnum-search',
    redirectTo: '/tabs/patent-docnum-search',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'help-contact',
    redirectTo: '/tabs/help-contact',
    pathMatch: 'full'
  },
  // {
  //   path: 'profile',
  //   redirectTo: '/tabs/profile',
  //   pathMatch: 'full'
  // },

  {
    path: 'patent-document/:id',
    redirectTo: '/tabs/patent-document/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'patent-document/:id#relatedPatents',
    redirectTo: '/tabs/patent-document/:id/#relatedPatents',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'claim-detail',
    loadChildren: './pages/claims/claim-detail/claim-detail.module#ClaimDetailPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'claim-detail/:id',
    redirectTo: '/tabs/claim-detail/:id',
    pathMatch: 'full'
    ,canActivate: [AuthGuard]
  },
  {
    path: 'abstract',
    loadChildren: './pages/abstract/abstract.module#AbstractPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'in-app-browser',
    loadChildren: './pages/in-app-browser/in-app-browser.module#InAppBrowserPageModule' 
  },
  {
    path: 'classification',
    loadChildren: './pages/classification/classification.module#ClassificationPageModule',
    canActivate: [AuthGuard]
  },

  // {
    // path: 'code-search/',
    // loadChildren: './pages/classification/code-search/code-search.module#CodeSearchPageModule' 
  // },
  {
    path: 'code-search/:id',
    redirectTo: '/tabs/code-search/:id',
    pathMatch: 'full'
  },

  {
    path: 'cpc-search',
    loadChildren: './pages/classification/cpc-search/cpc-search.module#CpcSearchPageModule' 
  },
  {
    path: 'cpc-results',
      redirectTo: '/tabs/cpc-results'
    },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signout',
    component: SignoutComponent
  },
  { path: 'graphdrop', loadChildren: './pages/graphdrop/graphdrop.module#GraphdropPageModule' },
  { path: 'learnmore', loadChildren: './pages/learnmore/learnmore.module#LearnmorePageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule {}
