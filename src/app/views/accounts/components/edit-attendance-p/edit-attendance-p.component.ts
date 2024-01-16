import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../attendance/attendance.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-attendance-p',
  templateUrl: './edit-attendance-p.component.html',
  styleUrls: ['./edit-attendance-p.component.scss']
})
export class EditAttendancePComponent implements OnInit {

  attendanceGroup: FormGroup;
  attendances =[
    {
      text: 'Absent',
      value: 'A'
    },
    {
      text: 'Leave',
      value: 'L'
    },
    {
      text: 'Present',
      value: 'P'
    }
  ];
  constructor(
    public dialogRef: MatDialogRef<EditAttendancePComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit(): void {
    this.attendanceGroup = new FormGroup({
      attendance: new FormControl('', [Validators.required])
    });
  }

  onSubmit(){
    this.attendanceService.updateUserAttendanceNCNS(this.data.user, this.data.day, this.attendanceGroup.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      }
    });
  }
}
