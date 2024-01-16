import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalaryBreakupComponent } from './view-salary-breakup.component';

describe('ViewSalaryBreakupComponent', () => {
  let component: ViewSalaryBreakupComponent;
  let fixture: ComponentFixture<ViewSalaryBreakupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSalaryBreakupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSalaryBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
