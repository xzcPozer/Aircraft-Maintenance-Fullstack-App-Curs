import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformedWorkAddComponent } from './performed-work-add.component';

describe('PerformedWorkAddComponent', () => {
  let component: PerformedWorkAddComponent;
  let fixture: ComponentFixture<PerformedWorkAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformedWorkAddComponent]
    });
    fixture = TestBed.createComponent(PerformedWorkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
