import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-edit-working-hours',
  templateUrl: './edit-working-hours.component.html',
  styleUrls: ['./edit-working-hours.component.scss']
})
export class EditWorkingHoursComponent implements OnInit {

  workingHoursForm: FormGroup;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditWorkingHoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.createWorkingHoursForm();
    if (this.data.hours) {
      this.workingHoursForm.get('standard').setValue(this.data.hours[0]?.value);
      this.workingHoursForm.get('hybrid').setValue(this.data.hours[1]?.value);
      this.workingHoursForm.get('workFromHome').setValue(this.data.hours[2]?.value);
      this.workingHoursForm.get('onDuty').setValue(this.data.hours[3]?.value);
    }
  }

  createWorkingHoursForm() {
    this.workingHoursForm = this.fb.group({
      standard: ['', Validators.required],
      hybrid : ['', Validators.required],
      workFromHome: ['', Validators.required],
      onDuty: ['', Validators.required]
    });
  }

  onSubmitWorkingHoursForm() {
    this.errorMessage = '';
    this.companyService.updateWorkingHours(this.workingHoursForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
