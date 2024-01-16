import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss'],
  animations: egretAnimations
})
export class ViewEmployeesComponent implements OnInit {
  displayedColumns = [
    'name',
    'phone',
    'email'
  ];
  viewEmployeesData: any;

  constructor(
    public dialogRef: MatDialogRef<ViewEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {
    this.viewEmployeesData = this.data || [];
  }

}
