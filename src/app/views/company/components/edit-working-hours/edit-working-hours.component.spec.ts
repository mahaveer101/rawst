import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkingHoursComponent } from './edit-working-hours.component';

describe('EditWorkingHoursComponent', () => {
  let component: EditWorkingHoursComponent;
  let fixture: ComponentFixture<EditWorkingHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkingHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
