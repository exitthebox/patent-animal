import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    // RouterModule,
    // HttpClient
  ],
  imports: [
    CommonModule,
 //   HttpClient,
    RouterModule
  ],
  exports: [
    RouterModule,
 //   HttpClient
  ]
})
export class TestImportsModule { }
