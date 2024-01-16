import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOtHoursComponent } from './edit-ot-hours.component';

describe('EditOtHoursComponent', () => {
  let component: EditOtHoursComponent;
  let fixture: ComponentFixture<EditOtHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOtHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOtHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
