import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkDesignationComponent } from './add-bulk-designation.component';

describe('AddBulkDesignationComponent', () => {
  let component: AddBulkDesignationComponent;
  let fixture: ComponentFixture<AddBulkDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkDesignationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
