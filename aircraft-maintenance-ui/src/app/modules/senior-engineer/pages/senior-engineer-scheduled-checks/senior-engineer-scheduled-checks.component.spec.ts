import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorEngineerScheduledChecksComponent } from './senior-engineer-scheduled-checks.component';

describe('SeniorEngineerScheduledChecksComponent', () => {
  let component: SeniorEngineerScheduledChecksComponent;
  let fixture: ComponentFixture<SeniorEngineerScheduledChecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeniorEngineerScheduledChecksComponent]
    });
    fixture = TestBed.createComponent(SeniorEngineerScheduledChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
