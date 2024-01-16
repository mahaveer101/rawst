import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalaryBreakupDetailsComponent } from './view-salary-breakup-details.component';

describe('ViewSalaryBreakupDetailsComponent', () => {
  let component: ViewSalaryBreakupDetailsComponent;
  let fixture: ComponentFixture<ViewSalaryBreakupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSalaryBreakupDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSalaryBreakupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
