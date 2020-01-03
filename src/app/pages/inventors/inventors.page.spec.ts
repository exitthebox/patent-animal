import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorsPage } from './inventors.page';

describe('InventorsPage', () => {
  let component: InventorsPage;
  let fixture: ComponentFixture<InventorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
