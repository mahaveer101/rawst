import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShiftsListService } from '../shifts-list/shifts-list.service';

@Component({
  selector: 'app-add-update-shift',
  templateUrl: './add-update-shift.component.html',
  styleUrls: ['./add-update-shift.component.scss']
})
export class AddUpdateShiftComponent implements OnInit {
  shiftForm: FormGroup;
  weekday_map = {};
  errorMessage = '';
  name ="Create";

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUpdateShiftComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shiftsListService: ShiftsListService
  ) { }

  ngOnInit(): void {
    this.createShiftForm();
    this.weekday_map = this.data?.defaultData?.weekday_map || {};
    if (this.data.isEdit) {
      this.name = "Update"
      this.shiftForm.get('shift_name').setValue(this.data.rowData?.shift_name);
      if (this.data.rowData?.shift_start_time) {
        const times = this.data.rowData?.shift_start_time.split(':');
        const startTime = new Date(new Date().setHours(times[0], times[1], 0, 0));
        this.shiftForm.get('shift_start_time').setValue(startTime);
      }
      if (this.data.rowData?.shift_end_time) {
        const times = this.data.rowData?.shift_end_time.split(':');
        const endTime = new Date(new Date().setHours(times[0], times[1], 0, 0));
        this.shiftForm.get('shift_end_time').setValue(endTime);
      }
      const week_off_day = this.data.rowData?.week_off_day.split(',') || [];
      this.shiftForm.get('week_off_day').setValue(week_off_day);
    }
  }

  createShiftForm() {
    this.shiftForm = this.fb.group({
      shift_name: ['', Validators.required],
      shift_start_time: ['', Validators.required,],
      shift_end_time: ['', Validators.required,],
      week_off_day: [''],
    });
  }

  onSubmitShiftForm() {
    this.errorMessage = '';
    if (this.data.isAdd) {
      this.shiftsListService.submitShiftsForm(this.shiftForm.value).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.errorMessage = error?.error?.message;
        }
      });
    } else {
      
      this.shiftsListService.updateShift(this.shiftForm.value, this.data.rowData).subscribe({
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
