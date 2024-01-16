import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-add-holiday-form',
  templateUrl: './add-holiday-form.component.html',
  styleUrls: ['./add-holiday-form.component.scss']
})
export class AddHolidayFormComponent implements OnInit {
  holidayForm: FormGroup;
  errorMessage: '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddHolidayFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.createHolidayForm();
    if (this.data.action === 'edit') {
      this.holidayForm.get('holidayName').setValue(this.data.rowData.holiday_name);
      this.holidayForm.get('holidayDate').setValue(new Date(this.data.rowData.holiday_date));
    }
  }

  createHolidayForm() {
    this.holidayForm = this.fb.group({
      holidayName: ['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      holidayDate: ['', Validators.required],
    });
  }

  onSubmitHolidayForm() {
    this.errorMessage = '';
    if (this.data.action === 'edit') {
      this.companyService.updateHoliday(this.holidayForm.value, this.data.rowData.id).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.errorMessage = error?.error?.message;
        }
      });
    } else {
      this.companyService.onSubmitHolidayForm(this.holidayForm.value, this.data.companyId).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.errorMessage = error?.error?.message;
        }
      });
    }
  }

}
