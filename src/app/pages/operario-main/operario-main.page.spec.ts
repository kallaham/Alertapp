import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperarioMainPage } from './operario-main.page';

describe('OperarioMainPage', () => {
  let component: OperarioMainPage;
  let fixture: ComponentFixture<OperarioMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperarioMainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperarioMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
