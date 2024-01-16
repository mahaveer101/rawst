import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttendancePComponent } from './edit-attendance-p.component';

describe('EditAttendancePComponent', () => {
  let component: EditAttendancePComponent;
  let fixture: ComponentFixture<EditAttendancePComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAttendancePComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAttendancePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
