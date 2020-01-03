import { ClassificationService } from './../../services/classification.service';
// import { Classification } from './../../ngrx/models/classification.model';
import { debounceTime, map, take } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectorRef, Input, DoCheck, } from '@angular/core';
import { Location } from '@angular/common';

import { Neo4jService } from 'src/app/services/neo4j.service';
import { Subject, concat, from, BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { async } from 'q';

// import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { Classification } from 'src/app/ngrx/models/classification.model';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.page.html',
  styleUrls: ['./titles.page.scss']
})
export class TitlesPage implements 
OnInit 
// ,DoCheck 
{
  results: any[];
  resultsArray: any[] = [];
  searchTerm$ = new Subject<string>();
  combinedObject: {
    pdfUrl: string,
    title: string,
    docNumber: string,
    dateGranted: string,
    picBufferArray: []
  };
  p: number = 1;
  id: string = '';
  name: string = '';
  address: string = '';
  currentValue: string = '';
  fakePics: any[] = [];
  picsArray: any[] = [];
  tempArray: any[] = [];

  slideOpts = {
    intialSlide: 1
  };

  classification$: Observable<Classification>;
  classificationCodes: [] = [];
  cpcSearchTerm = {term: ''};
  cpcSearchText = {classificationText: ''};
  cpcCodesArray = [];


  @Input()
  searchTermInput;

  @Input()
  classificationArray: any[] = [];

  constructor(
    private neo4j: Neo4jService,
    private _ref: ChangeDetectorRef,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private classArray: ClassificationService,
   // private store: Store<{ classification: Classification}>,

  ) {
      const title = 'title';

      



    this.searchTerm$.subscribe({
      next: ( val: any ) => {
        // this.cpcSearchTerm.term = val;
        this.cpcCodesArray.push({term: val})
        this.classificationCodes.forEach(element => {
          this.cpcCodesArray.push({classifcationNumber: element});
        });
        
        this.neo4j.searchEntries(val, title, 0)
          .subscribe( (res: any[]) => {
            // console.log('res: ', res);
            if(res.length > 0 ){
              this.results = res;
            } else {
              this.combinedObject = {
                docNumber: '',
                title: 'No Results',
                pdfUrl: '',
                dateGranted: '',
                picBufferArray: []
              };
              this.results.push(this.combinedObject);
            }

          })
      }
    });


  }




  buildTitleList(id: string){
    const title = 'title';


  }

  ngOnInit() {

    // this.classArray.getCodes().then( (codes: []) => {
    //   this.classificationArray.push(...codes)
    //   console.log('titles onInit(): ', this.classificationArray);
    // });
    /**
     * Because we use the titles page to show other patents for inventors,
     * we need to receive id, name, and address to fetch the list of other
     * patents the inventors invented
     */

    if(this.activatedRoute.snapshot.paramMap.get('id')){

      from(this.activatedRoute.snapshot.paramMap.get('id')).pipe(
        map(val => {
          this.id += val;

        })
      ).subscribe()

      from(this.activatedRoute.snapshot.paramMap.get('name')).pipe(
        map(val => {
          this.name += val;

      })
      ).subscribe()

      from(this.activatedRoute.snapshot.paramMap.get('address')).pipe(
        map(val => {
          this.address += val;

      })
      ).subscribe()
    }

    
    /**
     * After we grab the params values, we need to fetch the array(s)
     * of patent titles
     */

    if (this.id) {


      from(this.neo4j.getInventorTitles(this.name, this.address, 0)).pipe(
        map((res: any[]) => {
          /**
           * loop over the response array and pluck out the objects that contain the
           * title, docNumber, and dateGranted.
           */
          res.forEach((val, i) => {
            this.combinedObject = Object.assign(res[i][0], res[i][1]);
            this.resultsArray.push(this.combinedObject);

          });
          // Push them into an array
          this.results = this.resultsArray;
        })
      ).subscribe()
    }


  }

  loadMoreTitles(event){
  //  console.log(this.searchTermInput)

    this.searchTerm$ = this.searchTermInput;


    this.neo4j.searchEntries(
      this.searchTermInput,
      'title',
      this.results.length
      ).pipe(
        map( ( res: any[]) => {
          this.results = this.results.concat(res);
        })
      ).subscribe()


    event.target.complete();
  }

  goBack(){
    this.location.back();

    this.results = [];
    this.searchTermInput = '';
  }

  clearArray(){
    this.searchTermInput = '';
    this.results = [];
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}
