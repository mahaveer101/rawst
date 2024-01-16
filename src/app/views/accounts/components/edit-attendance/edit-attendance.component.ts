import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttendanceService } from '../attendance/attendance.service';

@Component({
  selector: 'app-edit-attendance',
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.scss']
})
export class EditAttendanceComponent implements OnInit {
  attendanceGroup: FormGroup;
  attendances =[
    {
      text: 'Absent',
      value: 'A'
    },
    {
      text: 'Comp Off',
      value: 'L'
    },
    {
      text: 'Leave',
      value: 'L'
    },
    {
      text: 'NCNS',
      value: 'NCNS'
    },
    {
      text: 'Present',
      value: 'P'
    },
    {
      text: 'Week Off',
      value: 'O'
    }
  ];
  constructor(
    public dialogRef: MatDialogRef<EditAttendanceComponent>,
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
