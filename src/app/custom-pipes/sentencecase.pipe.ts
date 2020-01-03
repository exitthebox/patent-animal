import { Pipe, PipeTransform } from '@angular/core';

// import { toSentenceCase } from 'sentencecase.js';

@Pipe({name: 'sentencecase'})
export class SentencecasePipe implements PipeTransform{
    transform(value: string): string {
     // console.log('value: ', value)
      return value.toString()
        .split(/(\S.+?[.!?])(?=\s+|$)/)
        .filter(sentence => sentence.length > 0)
        .map(sentence => {

          // console.log('sentence: ', sentence)
          return (
            sentence.charAt(0).toUpperCase() + sentence.substr(1).toLowerCase()
          );
        })
        .join('');

    }
}