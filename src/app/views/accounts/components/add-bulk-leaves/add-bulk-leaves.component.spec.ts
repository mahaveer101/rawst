import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkLeavesComponent } from './add-bulk-leaves.component';

describe('AddBulkLeavesComponent', () => {
  let component: AddBulkLeavesComponent;
  let fixture: ComponentFixture<AddBulkLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
