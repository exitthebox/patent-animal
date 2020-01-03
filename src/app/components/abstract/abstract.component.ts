import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Neo4jService } from 'src/app/services/neo4j.service';

import { Observable, from } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-abstract-component',
  templateUrl: './abstract.component.html',
  styleUrls: ['./abstract.component.scss']
})
export class AbstractComponent implements OnInit {
  public show: boolean = false;

  id;
  patentDocument$: Observable<any[]>;
  inventorAddress;
  s3Url;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private neo4j: Neo4jService,
    private location: Location,
    private iab: InAppBrowser
  ) {}

  callS3(){

    from(this.neo4j.getFirstTIFF('PNG-US10292321'))// test data
      .subscribe(val => {
       // console.log('val: ',val[0])
        this.s3Url = val[0]
      });

  }

  linkToPDF(linkToPdf) {
    // console.log(linkToPdf);
    this.iab.create(linkToPdf, '_blank', 'location=yes');
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.patentDocument$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.neo4j.getPatentDoc('10292321'))// hard-coded for testing
      // switchMap((params: ParamMap) => this.neo4j.getPatentDoc(params.get('id')))
    );
  }

  inventorsPatents(name){

    /**
     * TODO: fetch the address for an inventor+patent number, then navigate to 
     * a "related inventions" page passing this information and subsequently
     * displaying the titles of each of the patents. Clicking the titles will
     * navigate to the details of the patents.
     */
     
    from(this.neo4j.getInventorAddress(this.id, name))
      .subscribe(val => {
        this.inventorAddress = val[0][0]
        // console.log('this.inventorAddress: ', this.inventorAddress);
        this.router.navigate(['titles', this.id, name, this.inventorAddress]);

      });

  }

  goBack(){
    this.location.back();
  }

  toggleHideShow() {
    this.show = !this.show;
  }
}
