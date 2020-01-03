import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSearchPage } from './code-search.page';

describe('CodeSearchPage', () => {
  let component: CodeSearchPage;
  let fixture: ComponentFixture<CodeSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
