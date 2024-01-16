import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPayrollComponent } from './users-payroll.component';

describe('UsersPayrollComponent', () => {
  let component: UsersPayrollComponent;
  let fixture: ComponentFixture<UsersPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPayrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
