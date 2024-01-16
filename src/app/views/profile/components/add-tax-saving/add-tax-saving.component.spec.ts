import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxSavingComponent } from './add-tax-saving.component';

describe('AddTaxSavingComponent', () => {
  let component: AddTaxSavingComponent;
  let fixture: ComponentFixture<AddTaxSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxSavingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
