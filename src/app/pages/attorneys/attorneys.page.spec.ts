import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttorneysPage } from './attorneys.page';

describe('AttorneysPage', () => {
  let component: AttorneysPage;
  let fixture: ComponentFixture<AttorneysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttorneysPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttorneysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
