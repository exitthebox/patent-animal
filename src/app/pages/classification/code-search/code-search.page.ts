import { Component, OnInit } from '@angular/core';
import { Subject, Observable, from, of } from 'rxjs';

import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { CpcResultsArrayService } from 'src/app/services/cpc-results-array.service';
import { ClassificationService } from './../../../services/classification.service';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { Classification } from '../../../ngrx/models/classification.model';
// import * as reducer from '../../../ngrx/reducers/classification.reducer';
import * as actions from '../../../ngrx/actions/classification.actions';

@Component({
  selector: 'app-code-search',
  templateUrl: './code-search.page.html',
  styleUrls: ['./code-search.page.scss'],
})
export class CodeSearchPage implements OnInit {

  id;
  checkedToggle = false;

  classification$: Observable<Classification[]>;
  classArray: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private neo4j: Neo4jService,
    private router: Router,
    private cpcArrayService: CpcResultsArrayService,
    private classService: ClassificationService,
    private store: Store<{classification: Classification}>,
  
   // private route: Route,

  ) {   }

  cpcCodes: any[];
  selectedArray: any[] = [];
  patentDocs: any[] = [];

  ngOnInit() {
    this.cpcArrayService.cpcArray = [];

    


    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    from(this.neo4j.searchForCpcCodes(this.id))
      .subscribe( ( val: any[] ) => {
        val.map( ( elm ) => {
          elm.checked = true;
          
        // console.log(elm);
        });
        this.cpcCodes = val;

      //  console.log( this.cpcCodes );
    }, error => console.log(error))
  }

  searchSubgroup(searchValue: String){
  // console.log('searchValue:', searchValue)

    const term = { term: searchValue};

    // put the search term in the [0] position
    this.selectedArray.unshift(term);

    /** ngrx store code */
  //   const codesArray: any[] = [];

  //  // this.classification$ = this.store.select('classification');
  //  this.selectedArray.forEach( val => {
  //    if (val.classificationNumber) {
  //     codesArray.push(val.classificationNumber);
  //    }
  //  });

  //  this.store.dispatch(new actions.AddClassification({
  //   letter: '',
  //   codes: codesArray
  //  }));

  //   console.log('searchValue: ',
  //     searchValue,
  //     ' ',
  //     'this.selectedArray: ',
  //     this.selectedArray,
  //     ' ',
  //     'codesArray: ',
  //     codesArray);

      // this.classArray = this.selectedArray; // might need to make this a Behavior Subject
      this.classService.setCodes(this.selectedArray);

    // call endpoint with subgroups for searching
    from(this.neo4j.searchforDocsUsingCpcCodes(this.selectedArray))
      .subscribe( ( elm: any[] ) => {
        // this.patentDocs = elm;
        elm.map( ( val ) => {
        //  console.log('elm: ', elm);

          this.patentDocs.push({
            docNumber: val.docNumber,
            title: val.title,
            picBufferArray: val.picBufferArray,
          });
        });
      // console.log('this.patentDocs: ', this.patentDocs)
        /**
            open new tab with results or clear and display on same tab?
        */
        
        // this.router.navigate(['cpc-results']).then(( val ) =>{
        //   console.log(val)
        // }).catch(e => console.log(e));
        this.cpcArrayService.cpcArray = this.patentDocs;

        this.router.navigate(['/cpc-results/B',
          // JSON.stringify(this.patentDocs)
          // this.patentDocs
          ]).then(( val ) =>{
        //  console.log(val)
        }).catch(e => console.log(e));
      });

  }

  toggleCheckbox(classificationNumber: String, checkbox: boolean){
    checkbox = !checkbox; // flip the boolean

    const selected = this.cpcCodes.filter( ( val, i ) =>{
       return val.classificationNumber === classificationNumber;
    });
   // console.log(selected);

   if(checkbox){
      this.selectedArray.push(selected[0])
   } else {
      const arrayPos = this.selectedArray.map( e => e.classificationNumber  )
        .indexOf(classificationNumber)
     // console.log('arrayPos: ', arrayPos);
      this.selectedArray.splice(arrayPos, 1);

   }

  //  console.log(this.selectedArray);
  //  this.searchSubgroup();

  }

}
