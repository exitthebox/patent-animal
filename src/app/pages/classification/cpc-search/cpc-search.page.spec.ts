import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcSearchPage } from './cpc-search.page';

describe('CpcSearchPage', () => {
  let component: CpcSearchPage;
  let fixture: ComponentFixture<CpcSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpcSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
