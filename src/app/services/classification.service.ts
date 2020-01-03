import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
  })
  export class ClassificationService {

  //  codesArray: [] = [];
    codesBSubject = new BehaviorSubject<string[]>([]);

    constructor(){}

    getCodes(){
      return new Promise ( ( resolve, reject ) => {
        this.codesBSubject.asObservable().subscribe( ( data ) => {
          // console.log('getCodes() data: ', data);
          resolve(data);
        });
      })
      
    }

    setCodes(codes){
      this.codesBSubject.next(codes);
      // console.log('classification service, codeBSubject: ', this.codesBSubject);
    }

  }