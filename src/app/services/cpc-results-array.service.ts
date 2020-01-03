import { CpcResultsPageModule } from './../pages/classification/cpc-results/cpc-results.module';
import { Injectable } from '@angular/core';
// import { CpcResultsPageModule } from '../pages/classification/cpc-results'

@Injectable({
  providedIn: 'root'
})
export class CpcResultsArrayService {

  cpcArray: any[];
  
  constructor() { }

  getArray(){
    return this.cpcArray;
  }

  setArray(cpcArray: any[]){
    this.cpcArray = cpcArray;
    return this.cpcArray;
  }
}
