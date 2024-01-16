import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkPreviousTaxComponent } from './add-bulk-previous-tax.component';

describe('AddBulkPreviousTaxComponent', () => {
  let component: AddBulkPreviousTaxComponent;
  let fixture: ComponentFixture<AddBulkPreviousTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkPreviousTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkPreviousTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
