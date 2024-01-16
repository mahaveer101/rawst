import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-employee-leaves-details',
  templateUrl: './view-employee-leaves-details.component.html',
  styleUrls: ['./view-employee-leaves-details.component.scss']
})
export class ViewEmployeeLeavesDetailsComponent implements OnInit {

  displayedLeaveColumn = [
    'type',
    'quota'
  ];
  leavesData = [];

  constructor(
    public dialogRef: MatDialogRef<ViewEmployeeLeavesDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {
    this.leavesData = this.data.leaves;
  }
}
