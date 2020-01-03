import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcResultsPage } from './cpc-results.page';

describe('CpcResultsPage', () => {
  let component: CpcResultsPage;
  let fixture: ComponentFixture<CpcResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpcResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
