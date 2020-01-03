import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentDocnumSearchPage } from './patent-docnum-search.page';

describe('PatentDocnumSearchPage', () => {
  let component: PatentDocnumSearchPage;
  let fixture: ComponentFixture<PatentDocnumSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentDocnumSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentDocnumSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
