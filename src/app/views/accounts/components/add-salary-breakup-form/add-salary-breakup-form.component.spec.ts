import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalaryBreakupFormComponent } from './add-salary-breakup-form.component';

describe('AddSalaryBreakupFormComponent', () => {
  let component: AddSalaryBreakupFormComponent;
  let fixture: ComponentFixture<AddSalaryBreakupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalaryBreakupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalaryBreakupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
