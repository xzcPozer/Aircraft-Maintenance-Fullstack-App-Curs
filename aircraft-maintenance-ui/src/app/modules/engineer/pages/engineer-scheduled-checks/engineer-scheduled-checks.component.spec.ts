import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerScheduledChecksComponent } from './engineer-scheduled-checks.component';

describe('EngineerScheduledChecksComponent', () => {
  let component: EngineerScheduledChecksComponent;
  let fixture: ComponentFixture<EngineerScheduledChecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngineerScheduledChecksComponent]
    });
    fixture = TestBed.createComponent(EngineerScheduledChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
