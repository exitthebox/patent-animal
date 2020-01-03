// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SearchbarComponent } from './../../components/searchbar/searchbar.component';
import { from } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
// import { MatGridList } from '@angular/material/grid-list';
// import { MatGridTile} from '@angular/material/grid-list';
import { MatListModule, MatGridListModule } from '@angular/material'
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ClassificationPage } from './classification.page';
import { CustomPipesModule } from 'src/app/custom-pipes/custom-pipes.module';
import { ClickColorDirective } from './../../directives/click-color-directive';


const routes: Routes = [
  {
    path: '',
    component: ClassificationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CustomPipesModule,
    MatListModule,
    MatGridListModule,
    MatCheckboxModule,
    // BrowserAnimationsModule
    // SearchbarComponent,

  ],
  declarations: [
    ClassificationPage,
    ClickColorDirective,
],
  exports:[
    CustomPipesModule,
    MatListModule,
    MatGridListModule,
    MatCheckboxModule,
  ]
})
export class ClassificationPageModule {}
