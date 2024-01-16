import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-edit-payroll',
  templateUrl: './edit-payroll.component.html',
  styleUrls: ['./edit-payroll.component.scss']
})
export class EditPayrollComponent implements OnInit {

  payrollForm: FormGroup;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPayrollComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.createPayrollForm();
    if (this.data.payrollSettings) {
      this.payrollForm.get('startDate').setValue(this.data.payrollSettings.monthly_cycle?.start_date);
      this.payrollForm.get('endDate').setValue(this.data.payrollSettings.monthly_cycle?.end_date);
      this.payrollForm.get('attendanceAllowance').setValue(this.data.payrollSettings.attendance_allowance);
      this.payrollForm.get('overTimePercentage').setValue(this.data.payrollSettings.over_time_percentage);
    }
  }

  createPayrollForm() {
    this.payrollForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      attendanceAllowance: ['', Validators.required],
      overTimePercentage: ['', Validators.required]
    });
  }

  onSubmitPayrollForm() {
    this.errorMessage = '';
    this.companyService.updatePayroll(this.payrollForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
