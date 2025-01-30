import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReportBySerialNumberAndPeriodComponent } from './create-report-by-serial-number-and-period.component';

describe('CreateReportBySerialNumberAndPeriodComponent', () => {
  let component: CreateReportBySerialNumberAndPeriodComponent;
  let fixture: ComponentFixture<CreateReportBySerialNumberAndPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateReportBySerialNumberAndPeriodComponent]
    });
    fixture = TestBed.createComponent(CreateReportBySerialNumberAndPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
