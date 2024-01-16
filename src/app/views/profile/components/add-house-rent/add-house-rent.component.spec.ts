import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseRentComponent } from './add-house-rent.component';

describe('AddHouseRentComponent', () => {
  let component: AddHouseRentComponent;
  let fixture: ComponentFixture<AddHouseRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHouseRentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHouseRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
