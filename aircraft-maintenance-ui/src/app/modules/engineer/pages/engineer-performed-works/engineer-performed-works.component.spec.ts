import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerPerformedWorksComponent } from './engineer-performed-works.component';

describe('EngineerPerformedWorksComponent', () => {
  let component: EngineerPerformedWorksComponent;
  let fixture: ComponentFixture<EngineerPerformedWorksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngineerPerformedWorksComponent]
    });
    fixture = TestBed.createComponent(EngineerPerformedWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
