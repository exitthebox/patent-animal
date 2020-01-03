import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Location } from '@angular/common';


import { Neo4jService } from 'src/app/services/neo4j.service';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.page.html',
  styleUrls: ['./claims.page.scss'],
})
export class ClaimsPage implements OnInit {

  results: any[] = [];
  resultsArray: any[] = [];
  searchTerm$ = new Subject<string>();
  combinedObject: Object;

  @Input()
  claimSearch;

  constructor(
    private neo4j: Neo4jService,
    private _ref: ChangeDetectorRef,
    private location: Location,
    private router: Router
  ) {
    const claim = 'claim';

    this.searchTerm$.subscribe({
      next: ( val: any ) => {
        // console.log(val)
        this.neo4j.searchEntries(val, claim, 0)
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

  ngOnInit() {
  }

  loadMoreTitles(event){
    //  console.log(this.searchTermInput)
  
  //    this.searchTerm$ = this.searchTermInput;
  
      from(this.neo4j.refreshTitlesUsingClaim(this.claimSearch, this.results.length)).pipe(
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
    this.claimSearch = '';
  }
}
