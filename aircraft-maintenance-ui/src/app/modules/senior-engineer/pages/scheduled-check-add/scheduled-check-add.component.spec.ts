import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledCheckAddComponent } from './scheduled-check-add.component';

describe('ScheduledCheckAddComponent', () => {
  let component: ScheduledCheckAddComponent;
  let fixture: ComponentFixture<ScheduledCheckAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduledCheckAddComponent]
    });
    fixture = TestBed.createComponent(ScheduledCheckAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
