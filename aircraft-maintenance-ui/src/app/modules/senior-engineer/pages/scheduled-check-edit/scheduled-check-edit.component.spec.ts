import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledCheckEditComponent } from './scheduled-check-edit.component';

describe('ScheduledCheckEditComponent', () => {
  let component: ScheduledCheckEditComponent;
  let fixture: ComponentFixture<ScheduledCheckEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduledCheckEditComponent]
    });
    fixture = TestBed.createComponent(ScheduledCheckEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
