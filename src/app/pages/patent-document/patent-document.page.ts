// import { SentenceCasePipe } from './../../services/sentencecase.pipe.OLD';
import { Subject, Observable, from, of } from 'rxjs';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';

import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// import { SentencecasePipe } from './../../custom-pipes/sentencecase.pipe';


@Component({
  selector: 'app-patent-document',
  templateUrl: './patent-document.page.html',
  styleUrls: ['./patent-document.page.scss'],
})
export class PatentDocumentPage implements OnInit, AfterViewInit {
  public showDesc: boolean = false;
  public showImages: boolean = false;
  public showAssignee: boolean = false;
  public showInventor: boolean = false;
  public showAttorney: boolean = false;
  public showRelated: boolean = false;

  id$: Observable<any>; 
  id;
  patentDocument$: Observable<any[]>;
  patentImages$: Observable<any[]>;

  titleCheck;
  inventorAddress;
  searchText: string;
  showImageSection = true;

  slideOpts = {
    intialSlide: 1
  };

  private fragment: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private neo4j: Neo4jService,
    private location: Location,
    private iab: InAppBrowser
    // private pageScrollService: PageScrollService, 
    // @Inject(DOCUMENT) private document: any
    ) { }


    linkToPDF(linkToPdf){
      // console.log(linkToPdf)
      this.iab.create(linkToPdf, '_blank', 'location=yes');
    }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.patentDocument$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.neo4j.getPatentDoc(params.get('id'))),
      catchError( _ => of('error'))
      // map((x)=>{
      //   console.log('xxx', x)
      // })
      // ,tap(console.log(this.patentDocument$))
    );

    this.patentImages$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.neo4j.getAllImages(params.get('id'))),
      tap( val => {
        this.showImageSection = false;
        // console.log('showImageSection: ', this.showImageSection);
      }),
      catchError( _ => of('error'))
    );

    // this.patentImages$.subscribe(res => { 
    //   console.log('image res:',  res); 
    // }       );

    // this.activatedRoute.fragment.subscribe(fragment => { this.fragment = fragment; });

    /**
     * ngx-page-scroll
     * Animated scrolling functionality
     */
    // this.pageScrollService.scroll({
    //   document: this.document,
    //   scrollTarget: 'relatedPatents',
    // });

  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

  inventorsPatents(name){

    /**
     * TODO: fetch the address for an inventor+patent number, then navigate to 
     * a "related inventions" page passing this information and subsequently
     * displaying the titles of each of the patents. Clicking the titles will
     * navigate to the details of the patents.
     */
    // from(this.neo4j.getInventorAddress(this.id, name)).subscribe(val => console.log(name, this.id, val))


    // var inventorAddress = '';
    
    from(this.neo4j.getInventorAddress(this.id, name))
      .subscribe(val => {
        this.inventorAddress = val[0][0]
        // console.log('this.inventorAddress: ', this.inventorAddress);
        this.router.navigate(['titles', this.id, name, this.inventorAddress])
        // from(this.neo4j.getInventorTitles(name, this.inventorAddress)).pipe(
          
        // )
        // .subscribe()
      })


  //  console.log(name, this.id, this.inventorAddress)
  }

  goBack(){
    this.location.back();
  }

  toggleHideShowDesc() {
    this.showDesc = !this.showDesc;
  }

  toggleHideShowImages(){
    this.showImages = !this.showImages;
  }

  // toggleHideShowAssignee
  toggleHideShowAssignee(){
    this.showAssignee = !this.showAssignee;
  }

  toggleHideShowInventor(){
    this.showInventor = !this.showInventor;
  }

  toggleHideShowAttorney(){
    this.showAttorney = !this.showAttorney;
  }

  toggleHideShowRelated(){
    this.showRelated = !this.showRelated;
  }
}
