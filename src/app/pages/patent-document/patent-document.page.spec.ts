import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentDocumentPage } from './patent-document.page';

describe('PatentDocumentPage', () => {
  let component: PatentDocumentPage;
  let fixture: ComponentFixture<PatentDocumentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentDocumentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentDocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
