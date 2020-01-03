import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpContactPage } from './help-contact.page';

describe('HelpContactPage', () => {
  let component: HelpContactPage;
  let fixture: ComponentFixture<HelpContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpContactPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
