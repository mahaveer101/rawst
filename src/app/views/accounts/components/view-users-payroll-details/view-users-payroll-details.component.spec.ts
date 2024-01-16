import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsersPayrollDetailsComponent } from './view-users-payroll-details.component';

describe('ViewUsersPayrollDetailsComponent', () => {
  let component: ViewUsersPayrollDetailsComponent;
  let fixture: ComponentFixture<ViewUsersPayrollDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUsersPayrollDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUsersPayrollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
