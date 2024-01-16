import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAddressComponent } from './edit-user-address.component';

describe('EditUserAddressComponent', () => {
  let component: EditUserAddressComponent;
  let fixture: ComponentFixture<EditUserAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
