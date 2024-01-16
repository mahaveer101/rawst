import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-salary-breakup-details',
  templateUrl: './view-salary-breakup-details.component.html',
  styleUrls: ['./view-salary-breakup-details.component.scss']
})
export class ViewSalaryBreakupDetailsComponent implements OnInit {
salaryBreakpData : any;
  constructor(
    public dialogRef: MatDialogRef<ViewSalaryBreakupDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {
    this.salaryBreakpData = this.data;
  }

  public toFloat(value: string): number {
    if (!value) {
      return 0;
    }
    return parseFloat(value.replace(/,/g, ''));
 }

}
