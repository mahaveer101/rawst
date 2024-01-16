import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkDepartmentComponent } from './add-bulk-department.component';

describe('AddBulkDepartmentComponent', () => {
  let component: AddBulkDepartmentComponent;
  let fixture: ComponentFixture<AddBulkDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
