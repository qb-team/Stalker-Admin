import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeReportComponent } from './time-report.component';

describe('TimeReportComponent', () => {
  let component: TimeReportComponent;
  let fixture: ComponentFixture<TimeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
