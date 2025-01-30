import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReportByPeriodComponent } from './create-report-by-period.component';

describe('CreateReportByPeriodComponent', () => {
  let component: CreateReportByPeriodComponent;
  let fixture: ComponentFixture<CreateReportByPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateReportByPeriodComponent]
    });
    fixture = TestBed.createComponent(CreateReportByPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
