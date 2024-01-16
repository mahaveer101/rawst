import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-calculation',
  templateUrl: './view-calculation.component.html',
  styleUrls: ['./view-calculation.component.scss']
})
export class ViewCalculationComponent implements OnInit {
  calculationList: any;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewCalculationComponent>,
    // private employeeListService: EmployeeListService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.calculationList = this.data;
  }

  
}
