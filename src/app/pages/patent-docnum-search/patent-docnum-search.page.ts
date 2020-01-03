import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";

import { Location } from "@angular/common";

import { Neo4jService } from "src/app/services/neo4j.service";
import { Subject, from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-patent-docnum-search",
  templateUrl: "./patent-docnum-search.page.html",
  styleUrls: ["./patent-docnum-search.page.scss"]
})
export class PatentDocnumSearchPage implements OnInit {
  results: any[] = [];
  resultsArray: any[] = [];
  id;
  searchTerm$ = new Subject<string>();
  patentDocument$: Observable<any[]>;

  combinedObject: Object;

  @Input()
  docSearch;

  constructor(
    private activatedRoute: ActivatedRoute,
    private neo4j: Neo4jService,
    private _ref: ChangeDetectorRef,
    private location: Location
  ) {
    
  }

  ngOnInit() {
    // this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.patentDocument$ = this.activatedRoute.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.neo4j.getPatentDoc(params.get('id')))
    // );
  }

  getPatentDoc(doc) {
    if (doc) {
      this.neo4j
        .getPatentDoc(doc)

        .subscribe((res: any[]) => {
        //  console.log('res[0].PATENT_NUMBER: ', res[0].PATENT_NUMBER.length)
        //  console.log('objectValues', Object.values(res[0].PATENT_NUMBER))
          if (res[0].PATENT_NUMBER.length > 0) {
            this.results.push(res[0]);

            // activate detect changes because for some reason Angular wasn't doing this, perhaps its a bug
            this._ref.detectChanges();

            // reset the worker array so any new keyups will clear the old results on the template.
            // this.resultsArray = [];
          } else {
            this.results = [];
          }
        });
    } else {
      this.results = [];
    }
  }

  clearArray() {
  //  console.log("clearArray()..");
    this.docSearch = "";
    this.results = [];
  }

  goBack() {
    this.location.back();

    this.results = [];
    this.docSearch = '';
  }
}
