import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  companyForm: FormGroup;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.createcompanyForm();
    if (this.data.company) {
      this.companyForm.get('companyName').setValue(this.data.company.company_name);
      this.companyForm.get('email').setValue(this.data.company.email);
      this.companyForm.get('contactNumber').setValue(this.data.company.contact_number);
      this.companyForm.get('streetAddress').setValue(this.data.company.street_address);
      this.companyForm.get('city').setValue(this.data.company.city);
      this.companyForm.get('state').setValue(this.data.company.state);
      this.companyForm.get('pincode').setValue(this.data.company.pincode);
      this.companyForm.get('country').setValue(this.data.company.country);
    }
  }

  createcompanyForm() {
    this.companyForm = this.fb.group({
      companyName : ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  onSubmitCompanyForm() {
    this.errorMessage = '';
    this.companyService.updateCompany(this.companyForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
