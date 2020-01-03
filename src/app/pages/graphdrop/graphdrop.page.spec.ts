import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphdropPage } from './graphdrop.page';

describe('GraphdropPage', () => {
  let component: GraphdropPage;
  let fixture: ComponentFixture<GraphdropPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphdropPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphdropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
