import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-edit-company-leave-type',
  templateUrl: './edit-company-leave-type.component.html',
  styleUrls: ['./edit-company-leave-type.component.scss']
})
export class EditCompanyLeaveTypeComponent implements OnInit {

  leaveTypesForm: FormGroup;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCompanyLeaveTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.createLeaveTypesForm();
    if (this.data.companyLeaves) {
      this.leaveTypesForm.get('casualLeaves').setValue(this.data.companyLeaves[0]?.quota);
      this.leaveTypesForm.get('sickLeaves').setValue(this.data.companyLeaves[1]?.quota);
      this.leaveTypesForm.get('earnedLeaves').setValue(this.data.companyLeaves[2]?.quota);
      this.leaveTypesForm.get('shortLeaves').setValue(this.data.companyLeaves[3]?.quota);
    }
  }

  createLeaveTypesForm() {
    this.leaveTypesForm = this.fb.group({
      casualLeaves: ['', Validators.required],
      sickLeaves: ['', Validators.required],
      earnedLeaves: ['', Validators.required],
      shortLeaves: ['', Validators.required]
    });
  }

  onSubmitLeaveTypesForm() {
    this.errorMessage = '';
    this.companyService.updateLeaveTypes(this.leaveTypesForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
