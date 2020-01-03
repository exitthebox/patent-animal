import { CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  HttpClientModule, } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TitlesPage } from './titles.page';

describe('TitlesPage', () => {
  let component: TitlesPage;
  let fixture: ComponentFixture<TitlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      
      ],
      declarations: [ TitlesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // beforeEach(inject([MockBackend]), (mockBackend)=>{
  //   backend = mockBackend;
  // })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
