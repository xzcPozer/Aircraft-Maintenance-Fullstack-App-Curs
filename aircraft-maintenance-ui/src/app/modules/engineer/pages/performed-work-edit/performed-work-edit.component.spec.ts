import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformedWorkEditComponent } from './performed-work-edit.component';

describe('PerformedWorkEditComponent', () => {
  let component: PerformedWorkEditComponent;
  let fixture: ComponentFixture<PerformedWorkEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformedWorkEditComponent]
    });
    fixture = TestBed.createComponent(PerformedWorkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
