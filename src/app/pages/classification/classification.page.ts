import { transition, animate, state, style, trigger } from '@angular/animations';

import { MatGridTile } from '@angular/material/grid-list';
import { ClickColorDirective } from './../../directives/click-color-directive';
import { AppState } from './../../ngrx/app.state';
import { Classification } from './../../ngrx/models/classification.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, ViewChildren, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

import { Subject, Observable, from, of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { ClassificationService } from './../../services/classification.service';
import { CpcResultsArrayService } from 'src/app/services/cpc-results-array.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.page.html',
  styleUrls: ['./classification.page.scss'],
  animations: [
    trigger('hideShowSearchBar', [
      state('hidden', style({
        display: 'none',
        backgroundColor: '#fff'
      })),
      state('shown', style({
        display: 'inline',
        backgroundColor: '#f97070'

      })),
      transition('hidden => shown', [
        animate('.5s')
      ]),
      // transition('shown => hidden', [
      //   animate('.5s')
      // ]),
    ]),
    trigger('hideShowFilterBar', [
      state('hidden', style({
        display: 'none',
        // backgroundColor: '#fff'
      })),
      state('shown', style({
        display: 'inline',
        // '--padding': '10px'
        // backgroundColor: '#f97070'

      })),
      transition('hidden => shown', [
        animate('.5s')
      ]),
      // transition('shown => hidden', [
      //   animate('.5s')
      // ]),
    ]),
  ],
})

export class ClassificationPage implements OnInit, AfterViewInit {

  state = 'hidden';
  filterBarState = 'hidden';

  constructor(
    private activatedRoute: ActivatedRoute,
    private neo4j: Neo4jService,
    private classService: ClassificationService,
    private cpcArrayService: CpcResultsArrayService,
    private router: Router,
    private renderer: Renderer2


  ) {


  }

  

  @Input()
  searchTermInput;

  selectCpc = false;
  searchTermSpinner = false;
  // selectedToggle = false;

  @Input()
  filterCpcCode;

  @Input()
  checkedToggle = false;

  selectedArray: any[] = [];
  patentDocs: any[] = [];

  searchTerm$ = new Subject<string>();

  cpcCodes: any[] = [];
  filteredCpcArray: any[] = [];

  letter: string;


  searchForCpcCodes(cpcCode: any){

    from(this.neo4j.searchForCpcCodes(cpcCode))
      .subscribe( ( val: any[] ) => {

        this.cpcCodes = val;

       // console.log( this.cpcCodes[1].classificationText );
      })
  }

  ngOnInit() {
  }

  /**filter array logic straight outta MDN */
  filterItems(arr: [], query: string) {
    return arr.filter((el: any) => {
        return el.classificationText.toString().toLowerCase().indexOf(query.toString().toLowerCase()) !== -1;
    })
  }

  selectLetter(letter: any){
    // this.filterCpcCode = letter;
    this.selectCpc = !this.selectCpc;

    this.filterBarState = 'shown';
    // save it for clearing later
    this.letter = letter;

    from(this.neo4j.searchForCpcCodes(letter))
      .subscribe( ( val: [] ) => {

        this.cpcCodes = val;

        /**narrow down the list of cpc codes based on text search. 
         * Doing it this way because Angular got rid of pipe filter. 
         */
        this.searchTerm$.subscribe({
          next: ( term: any ) => {
            this.cpcCodes = this.filterItems(val, term);
          }
        });

      //  console.log( this.cpcCodes[1].classificationText );
      })
  }


  toggleCheckbox(classificationNumber: String, checkbox: boolean){

    this.checkedToggle = ! this.checkedToggle;

    const arrayPos = this.selectedArray.findIndex( ( elm ) => elm.classificationNumber === classificationNumber );

    if(arrayPos >= 0){
      this.selectedArray.splice(arrayPos, 1);
    } else {
        const selected = this.cpcCodes.filter( ( val, i ) =>{
          return val.classificationNumber === classificationNumber;
        });
        this.selectedArray.push(selected[0]);
    }

    // console.log('this.selectedArray.lenth: ', this.selectedArray.length);
    // console.log('this.state: ', this.state);
    
    /** check to see if multiple selections have been made before hiding the search bar */
    if(this.selectedArray.length >= 1){
      this.state = 'shown';
    } else {
      this.state === 'hidden' ? this.state = 'shown' : this.state = 'hidden';

    }
  }

  /** need to implement this code 11/9/2019 */
  /** Need to navigate to a different screen for results... */
  searchSubgroup(searchValue: String){
    // console.log('searchValue:', searchValue)

      const term = { term: searchValue};
      this.searchTermSpinner = true;

      // put the search term in the [0] position
      this.selectedArray.unshift(term);

        // this.classArray = this.selectedArray; // might need to make this a Behavior Subject
        this.classService.setCodes(this.selectedArray);

      // call endpoint with subgroups for searching
      from(this.neo4j.searchforDocsUsingCpcCodes(this.selectedArray))
        .subscribe( ( elm: any[] ) => {
          // this.patentDocs = elm;

          Promise.all([
            elm.map( ( val ) => {
              //  console.log('elm: ', elm);
    
                this.patentDocs.push({
                  docNumber: val.docNumber,
                  title: val.title,
                  picBufferArray: val.picBufferArray,
                });
                // console.log('this.patentDocs: ', this.patentDocs)
              })
          ]).then( (result) => {
            //  console.log('result: ', result)
            this.cpcArrayService.cpcArray = this.patentDocs;

            this.router.navigate(['/cpc-results',
              // JSON.stringify(this.patentDocs)
              // this.patentDocs
              ]).then(( val ) =>{
                this.searchTermSpinner = false;
            // console.log(val)
            }).catch(e => console.log(e));
          })

        });

    }

    ngAfterViewInit(){
      // console.log('viewChild: ', this.matGridSelector.nativeElement)

    }

    clearValues(matGridTileEl){
      this.selectLetter(this.letter || 'Z');
      // this.filterBarState = 'hidden';
      // console.log(matGridTileEl)
      // console.log('viewChild: ', this.matGridSelector._setStyle('background','#fff'));
      // this.matGridSelector._setStyle('background:','#fff')
      this.selectedArray = [];
      
    }

   setCheckedStyle(){

     return {
       checked: true
     }
   }



}
