import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentFormComponent } from './add-department-form.component';

describe('AddDepartmentFormComponent', () => {
  let component: AddDepartmentFormComponent;
  let fixture: ComponentFixture<AddDepartmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepartmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
