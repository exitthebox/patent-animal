import { map } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { Subject, from } from 'rxjs';


@Component({
  selector: 'app-owners',
  templateUrl: './owners.page.html',
  styleUrls: ['./owners.page.scss'],
})
export class OwnersPage implements OnInit {
  results: any[] = [];
  resultsArray: any[] = [];
  searchTerm$ = new Subject<string>();
  combinedObject: Object;

  @Input()
  searchTermInput;

  constructor(
    private neo4j: Neo4jService,
    private _ref: ChangeDetectorRef,
    private location: Location,

  ) { 
    const owner  = 'owner';
  //  console.log(this.descSearch)
  this.searchTerm$.subscribe({
    next: ( val: any ) => {
      // console.log(val)
      this.neo4j.searchEntries(val, owner, 0)
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
  
  goBack(){
    this.location.back();

    this.results = [];
    this.searchTermInput = '';
  }
  clearArray() {
    //  console.log("clearArray()..");
      this.searchTermInput = "";
      this.results = [];
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
}
