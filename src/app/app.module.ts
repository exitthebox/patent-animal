import { ProfilePageModule } from './pages/profile/profile.module';
import { CallbackComponent } from './components/callback/callback.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbstractComponent } from './components/abstract/abstract.component';

import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import {SignoutComponent } from './components/signout/signout.component';

import { DragulaModule } from 'ng2-dragula';

import { StoreModule } from '@ngrx/store';
import { classReducer } from './../app/ngrx/reducers/classification.reducer';


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    ProfileComponent,
    SignoutComponent,


  ],
  entryComponents: [
    CallbackComponent,
    ProfileComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    DragulaModule.forRoot(),
    StoreModule.forRoot({
      classification: classReducer
    })
  //  AuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  exports: [
    // SentencecasePipe
  ]
})
export class AppModule {}
