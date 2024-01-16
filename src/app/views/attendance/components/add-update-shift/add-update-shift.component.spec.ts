import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateShiftComponent } from './add-update-shift.component';

describe('AddUpdateShiftComponent', () => {
  let component: AddUpdateShiftComponent;
  let fixture: ComponentFixture<AddUpdateShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
