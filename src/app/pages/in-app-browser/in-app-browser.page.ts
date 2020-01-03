import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-in-app-browser',
  templateUrl: './in-app-browser.page.html',
  styleUrls: ['./in-app-browser.page.scss']
})
export class InAppBrowserPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {

    this.iab.create('https://pdfpiw.uspto.gov/fdd/50/194/102/0.pdf', '_system', 'location=yes');
    
  }
}
