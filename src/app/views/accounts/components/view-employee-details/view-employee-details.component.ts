import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-employee-details',
  templateUrl: './view-employee-details.component.html',
  styleUrls: ['./view-employee-details.component.scss']
})
export class ViewEmployeeDetailsComponent implements OnInit {

  employeeData: any;
  constructor(
    public dialogRef: MatDialogRef<ViewEmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {
    this.employeeData = this.data;
  }
}
