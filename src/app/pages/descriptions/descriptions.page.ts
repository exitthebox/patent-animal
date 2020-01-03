import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Location } from '@angular/common';


import { Neo4jService } from 'src/app/services/neo4j.service';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.page.html',
  styleUrls: ['./descriptions.page.scss'],
})
export class DescriptionsPage implements OnInit {

  results: any[] = [];
  resultsArray: any[] = [];
  searchTerm$ = new Subject<string>();
  combinedObject: Object;

  fakeResults = new Array(10);
  

  @Input()
  descSearch;

  constructor(
    private neo4j: Neo4jService,
    private _ref: ChangeDetectorRef,
    private location: Location,

  ) {

    const desc = 'desc';

    this.searchTerm$.subscribe({
      next: ( val: any ) => {
        console.log(val)
        this.neo4j.searchEntries(val, desc, 0)
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
  //   const desc  = 'desc';
  // //  console.log(this.descSearch)
  //   this.neo4j
  //     .search(this.searchTerm$, desc)

  //     .subscribe((res: any[]) => {
  //       /**
  //        * loop over the response array and pluck out the objects that contain the
  //        * title, docNumber, and dateGranted.
  //        */
  //       res.forEach((val, i) => {
  //       //  console.log('res: ', res)
  //         this.combinedObject = Object.assign(res[i][0], res[i][1]);
  //         this.resultsArray.push(this.combinedObject);
  //         // this.resultsArray.push(res[i][1])
  //         // console.log('combined Object:', this.combinedObject, ' val: ', val)
  //       });
  //       // console.log('this.resultsArray: ', this.resultsArray);
  //       // Push them into an array
  //       this.results = this.resultsArray;
  //       // activate detect changes because for some reason Angular wasn't doing this, perhaps its a bug
  //       this._ref.detectChanges();
  //       // reset the worker array so any new keyups will clear the old results on the template.
  //       this.resultsArray = [];

  //       if(!this.descSearch){
  //         this.results = [];
  //       }

  //       this.fakeResults = [];
  //     });

 


  }

  ngOnInit() {
  }

  loadMoreTitles(event){
    //  console.log(this.descSearch)
  
      this.searchTerm$ = this.descSearch;
      /**
       * TODO: THIS DOESN'T WORK 3/15/19
       * NEED TO CREATE FUNCTION FOR SEARCHING OVER DESCRIPTIONS AND NOT TITLES
       */
  
      from(this.neo4j.refreshTitlesUsingDesc(this.descSearch, this.results.length)).pipe(
        map((res: any[]) => {
          /**
           * loop over the response array and pluck out the objects that contain the
           * title, docNumber, and dateGranted.
           */
        //  console.log('titles.page.ts res: ', res)
          res.forEach((val, i) => {
            this.combinedObject = Object.assign(res[i][0], res[i][1]);
            this.results.push(this.combinedObject);
            // i++;
          });
          // console.log('this.resultsArray: ', this.resultsArray)
  
          // Push them into an array
          // this.results.push(this.resultsArray);
        //  console.log('this.results: ', this.results)
  
        })
      ).subscribe()
  
      event.target.complete();
    }
  
  goBack(){
    this.location.back();

    this.results = [];
    this.descSearch = '';
  }
  clearArray() {
    //  console.log("clearArray()..");
      this.descSearch = "";
      this.results = [];
    }

}
