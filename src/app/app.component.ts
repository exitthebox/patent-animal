import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Abstract',
      url: '/abstract',
      icon: 'document'
    },
    {
      title: 'Related Attorneys',
      url: '/attorneys',
      icon: 'attorney'
    },
    {
      title: 'Related Patents',
      url: '/related-patents',
      icon: 'copy'
    },
    {
      title: 'Search By Inventor',
      url: '/inventors',
      icon: 'people'
    },
    {
      title: 'Search By Owner',
      url: '/owners',
      icon: 'key'
    },
    {
      title: 'Search By Document Number',
      url: '/patent-docnum-search',
      icon: 'today'
    },
    {
      title: 'Help',
      url: '/help-contact',
      icon: 'help-circle'
    },
    // {
    //   title: 'Profile',
    //   url: '/profile',
    //   icon: 'settings'
    // },
    {
      title: 'Sign Out',
      url: '/signout',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(){
    this.auth.localAuthSetup(); // may need to move to an implementaion of OnInit()

  }
}
