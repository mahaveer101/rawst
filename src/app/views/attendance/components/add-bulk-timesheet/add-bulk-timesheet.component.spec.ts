import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkTimesheetComponent } from './add-bulk-timesheet.component';

describe('AddBulkTimesheetComponent', () => {
  let component: AddBulkTimesheetComponent;
  let fixture: ComponentFixture<AddBulkTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkTimesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
