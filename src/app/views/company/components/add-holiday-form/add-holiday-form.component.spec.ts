import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHolidayFormComponent } from './add-holiday-form.component';

describe('AddHolidayFormComponent', () => {
  let component: AddHolidayFormComponent;
  let fixture: ComponentFixture<AddHolidayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHolidayFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHolidayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
