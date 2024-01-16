import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateShiftsComponent } from './add-update-shifts.component';

describe('AddUpdateShiftsComponent', () => {
  let component: AddUpdateShiftsComponent;
  let fixture: ComponentFixture<AddUpdateShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
