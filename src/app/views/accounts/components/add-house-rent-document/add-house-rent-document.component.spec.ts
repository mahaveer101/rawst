import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseRentDocumentComponent } from './add-house-rent-document.component';

describe('AddHouseRentDocumentComponent', () => {
  let component: AddHouseRentDocumentComponent;
  let fixture: ComponentFixture<AddHouseRentDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHouseRentDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHouseRentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
