import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-users-payroll-details',
  templateUrl: './view-users-payroll-details.component.html',
  styleUrls: ['./view-users-payroll-details.component.scss']
})
export class ViewUsersPayrollDetailsComponent implements OnInit {

  payRollData: any;
  
  constructor(
    public dialogRef: MatDialogRef<ViewUsersPayrollDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {
    this.payRollData = this.data;
  }
}
