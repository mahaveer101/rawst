import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-edit-company-tax',
  templateUrl: './edit-company-tax.component.html',
  styleUrls: ['./edit-company-tax.component.scss']
})
export class EditCompanyTaxComponent implements OnInit {
  companyTaxForm: FormGroup;
  errorMessage = '';
 
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCompanyTaxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.createCompanyTax();
    if (this.data.companyTax) {
      this.companyTaxForm.get('startDate').setValue(new Date(this.data.companyTax.declaration?.start_date));
      this.companyTaxForm.get('endDate').setValue(new Date(this.data.companyTax.declaration?.end_date));
      this.companyTaxForm.get('standardDeduction').setValue(this.data.companyTax.standard_deduction);
      this.companyTaxForm.get('surchargesPercentage').setValue(this.data.companyTax.surcharges_percentage);
    }
  }

  createCompanyTax() {
    this.companyTaxForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      standardDeduction: ['', Validators.required],
      surchargesPercentage: ['', Validators.required]
    })
  }

  onSubmitCompanyTaxForm() {
    this.errorMessage = '';
    this.companyService.updateCompanyTax(this.companyTaxForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
