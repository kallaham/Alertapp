import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperarioChatPage } from './operario-chat.page';

describe('OperarioChatPage', () => {
  let component: OperarioChatPage;
  let fixture: ComponentFixture<OperarioChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperarioChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperarioChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
