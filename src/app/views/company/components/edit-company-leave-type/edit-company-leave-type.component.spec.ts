import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyLeaveTypeComponent } from './edit-company-leave-type.component';

describe('EditCompanyLeaveTypeComponent', () => {
  let component: EditCompanyLeaveTypeComponent;
  let fixture: ComponentFixture<EditCompanyLeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyLeaveTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCompanyLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
