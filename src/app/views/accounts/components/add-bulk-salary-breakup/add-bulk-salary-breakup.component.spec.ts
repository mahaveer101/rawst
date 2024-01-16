import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkSalaryBreakupComponent } from './add-bulk-salary-breakup.component';

describe('AddBulkSalaryBreakupComponent', () => {
  let component: AddBulkSalaryBreakupComponent;
  let fixture: ComponentFixture<AddBulkSalaryBreakupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkSalaryBreakupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkSalaryBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
