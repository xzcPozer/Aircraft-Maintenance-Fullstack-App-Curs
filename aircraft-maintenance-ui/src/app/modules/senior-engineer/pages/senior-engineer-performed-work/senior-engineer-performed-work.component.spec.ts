import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorEngineerPerformedWorkComponent } from './senior-engineer-performed-work.component';

describe('SeniorEngineerPerformedWorkComponent', () => {
  let component: SeniorEngineerPerformedWorkComponent;
  let fixture: ComponentFixture<SeniorEngineerPerformedWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeniorEngineerPerformedWorkComponent]
    });
    fixture = TestBed.createComponent(SeniorEngineerPerformedWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
