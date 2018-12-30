import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleFinderHomeComponent } from './people-finder-home.component';

describe('PeopleFinderHomeComponent', () => {
  let component: PeopleFinderHomeComponent;
  let fixture: ComponentFixture<PeopleFinderHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleFinderHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleFinderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
