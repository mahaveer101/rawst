import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkPreviousIncentiveComponent } from './add-bulk-previous-incentive.component';

describe('AddBulkPreviousIncentiveComponent', () => {
  let component: AddBulkPreviousIncentiveComponent;
  let fixture: ComponentFixture<AddBulkPreviousIncentiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkPreviousIncentiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkPreviousIncentiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
