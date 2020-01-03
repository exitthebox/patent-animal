import { AppState } from './../../../ngrx/app.state';
import { Classification } from './../../../ngrx/models/classification.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {

  classifications: Observable<Classification[]>;
  classArray: any[] = [];

  constructor(private store: Store<AppState>) {

    this.classifications = store.select('classification');
    this.classifications.subscribe( val => {
      this.classArray = val[0].codes;
      // console.log(val[0].codes)
    });
    
    // 'classification' comes from app module
    
  }

  ngOnInit() {}

}