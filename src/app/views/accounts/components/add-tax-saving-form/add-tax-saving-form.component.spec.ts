import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxSavingFormComponent } from './add-tax-saving-form.component';

describe('AddTaxSavingFormComponent', () => {
  let component: AddTaxSavingFormComponent;
  let fixture: ComponentFixture<AddTaxSavingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxSavingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxSavingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
