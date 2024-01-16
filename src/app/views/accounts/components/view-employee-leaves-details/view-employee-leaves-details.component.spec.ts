import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeLeavesDetailsComponent } from './view-employee-leaves-details.component';

describe('ViewEmployeeLeavesDetailsComponent', () => {
  let component: ViewEmployeeLeavesDetailsComponent;
  let fixture: ComponentFixture<ViewEmployeeLeavesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmployeeLeavesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmployeeLeavesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
