import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreviousIncentivesComponent } from './add-previous-incentives.component';

describe('AddPreviousIncentivesComponent', () => {
  let component: AddPreviousIncentivesComponent;
  let fixture: ComponentFixture<AddPreviousIncentivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPreviousIncentivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPreviousIncentivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
