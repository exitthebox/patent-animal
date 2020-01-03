import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPatentsPage } from './related-patents.page';

describe('RelatedPatentsPage', () => {
  let component: RelatedPatentsPage;
  let fixture: ComponentFixture<RelatedPatentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedPatentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedPatentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
