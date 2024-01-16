import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyTaxComponent } from './edit-company-tax.component';

describe('EditCompanyTaxComponent', () => {
  let component: EditCompanyTaxComponent;
  let fixture: ComponentFixture<EditCompanyTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCompanyTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
