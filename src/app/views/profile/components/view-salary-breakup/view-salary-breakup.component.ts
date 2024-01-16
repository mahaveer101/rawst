import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { egretAnimations } from 'app/shared/animations/egret-animations';
@Component({
  selector: 'app-view-salary-breakup',
  templateUrl: './view-salary-breakup.component.html',
  styleUrls: ['./view-salary-breakup.component.scss'],
  animations: egretAnimations
})
export class ViewSalaryBreakupComponent implements OnInit {
  salaryBreakupData : any;

  constructor(
    public dialogRef: MatDialogRef<ViewSalaryBreakupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {
    this.salaryBreakupData = this.data
  }

  public toFloat(value: string): number {
    return parseFloat(value.replace(/,/g, ''));
 }
  
}
