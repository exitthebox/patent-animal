import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersPage } from './owners.page';

describe('OwnersPage', () => {
  let component: OwnersPage;
  let fixture: ComponentFixture<OwnersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
