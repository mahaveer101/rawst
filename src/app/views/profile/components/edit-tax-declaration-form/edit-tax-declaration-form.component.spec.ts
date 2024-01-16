import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxDeclarationFormComponent } from './edit-tax-declaration-form.component';

describe('EditTaxDeclarationFormComponent', () => {
  let component: EditTaxDeclarationFormComponent;
  let fixture: ComponentFixture<EditTaxDeclarationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaxDeclarationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaxDeclarationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
