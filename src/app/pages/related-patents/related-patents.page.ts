import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-related-patents',
  templateUrl: './related-patents.page.html',
  styleUrls: ['./related-patents.page.scss'],
})
export class RelatedPatentsPage implements OnInit {
  patentDocument$: Observable<any[]>;
  id;

  constructor(
    private activatedRoute: ActivatedRoute,
    private neo4j: Neo4jService) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');


    this.patentDocument$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.neo4j.getPatentDoc(params.get('id')))
        // of(console.log(this.patentDocument$))
    );

    this.patentDocument$.subscribe(res => { 
      // console.log('related patents res:',  res); 
  } );

  }

}
