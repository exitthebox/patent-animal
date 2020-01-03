import { ClassificationService } from './../../../services/classification.service';
import { Component, OnInit, Injectable, DoCheck, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, concat, from, BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { CpcResultsArrayService } from 'src/app/services/cpc-results-array.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-cpc-results',
  templateUrl: './cpc-results.page.html',
  styleUrls: ['./cpc-results.page.scss'],
})

@Injectable()
export class CpcResultsPage implements OnInit, DoCheck, OnChanges {

  list; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private cpcArray: CpcResultsArrayService,
    private location: Location,
    private classArray: ClassificationService
  ) {
    
   }

   ngOnChanges(){
    //  console.log('ngOnChanges()')
   }

  ngDoCheck() {
   // console.log('ngDoCheck()')
    // console.log(this.list);
  }

  ngOnInit() {
    this.list = this.cpcArray.cpcArray;

    // console.log('ngOnInit()')
    // this.classArray.getCodes().then( data => {
    //   this.list = data;
    //   console.log(data)
    // });
   // console.log('classificationARray: ', classificationArray)


  }

  goBack(){
    this.location.back();
  }

}
