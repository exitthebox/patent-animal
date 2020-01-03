import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightPipe } from './highlight.pipe';
import { FilterPipe } from './filter.pipe';
import { SentencecasePipe } from './sentencecase.pipe';
import { ListFilterPipe } from './listFilter';


@NgModule({
  declarations: [
    SentencecasePipe,
    FilterPipe,
    HighlightPipe,
    ListFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SentencecasePipe,
    FilterPipe,
    HighlightPipe,
    ListFilterPipe
  ]
})
export class CustomPipesModule { }
