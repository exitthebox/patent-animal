import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Neo4jService } from 'src/app/services/neo4j.service';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';


@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.page.html',
  styleUrls: ['./claim-detail.page.scss'],
})
export class ClaimDetailPage implements OnInit {

  itemExpanded: boolean = true;
  itemExpandHeight: number = 200;

  patentDocument$: Observable<any[]>;
  patentImages$: Observable<any[]>;

  id;
  inventorAddress;
  searchText;
  
  slideOpts = {
    intialSlide: 1
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private neo4j: Neo4jService,
    private location: Location) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.patentDocument$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.neo4j.getPatentDocWithClaims(params.get('id'))),
      // tap(doc => console.log(doc))

    );

    this.patentImages$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.neo4j.getAllImages(params.get('id'))),
      // tap( val => {
      //   this.showImageSection = false;
      //   console.log('showImageSection: ', this.showImageSection);
      // }),
      catchError( _ => of('error'))
    );
  }

  inventorsPatents(name){
    
    from(this.neo4j.getInventorAddress(this.id, name))
      .subscribe(val => {
        this.inventorAddress = val[0][0]
        this.router.navigate(['titles', this.id, name, this.inventorAddress])
      })
  }

  goBack(){
    this.location.back();
  }

}
