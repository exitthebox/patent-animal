import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationPage } from './classification.page';

describe('ClassificationPage', () => {
  let component: ClassificationPage;
  let fixture: ComponentFixture<ClassificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
