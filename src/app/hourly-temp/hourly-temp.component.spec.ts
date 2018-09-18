import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyTempComponent } from './hourly-temp.component';

describe('HourlyTempComponent', () => {
  let component: HourlyTempComponent;
  let fixture: ComponentFixture<HourlyTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
