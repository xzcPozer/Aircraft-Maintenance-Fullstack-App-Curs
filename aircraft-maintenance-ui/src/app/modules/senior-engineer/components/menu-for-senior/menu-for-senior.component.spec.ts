import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuForSeniorComponent } from './menu-for-senior.component';

describe('MenuForSeniorComponent', () => {
  let component: MenuForSeniorComponent;
  let fixture: ComponentFixture<MenuForSeniorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuForSeniorComponent]
    });
    fixture = TestBed.createComponent(MenuForSeniorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
