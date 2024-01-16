import { Component, Inject, OnInit } from '@angular/core';
import { UsersPayrollService } from '../users-payroll/users-payroll.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';

@Component({
  selector: 'app-edit-payroll',
  templateUrl: './edit-payroll.component.html',
  styleUrls: ['./edit-payroll.component.scss']
})
export class EditPayrollComponent implements OnInit {

  payrollForm: FormGroup;
  errorMessage = '';
  types = [
    {
      text: 'Arrear',
      value: 'arrear'
    },
    {
      text: 'Deduction',
      value: 'deduction'
    },
    {
      text: 'KPI (Key Performance Incentive)',
      value: 'kpi'
    }
  ];
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditPayrollComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any ,
    private usersPayrollService: UsersPayrollService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    for (let each of this.types) {
      this.addExtra(each.value);
    }
  }

  createFormGroup() {
    this.payrollForm = this.fb.group({
      extra: new FormArray([])
    });
  }

  getTextForType(value) {
    return this.types.find(each => each.value === value).text;
  }

  get extra() {
    return this.payrollForm.controls["extra"] as FormArray;
  }

  addExtra(type) {
    this.extra.push(this.newExtraGroup(type));
  }

  newExtraGroup(type) {
    return new FormGroup({
      type: new FormControl(type),
      amount: new FormControl('',  [Validators.required, Validators.pattern(regExps.digitsPattern)]),
      remark: new FormControl(''),
    });
  }

  onSubmitExtraForm() {
    this.usersPayrollService.submitPayroll(this.data.payrollDetails, this.payrollForm.value).subscribe(res => {
      this.dialogRef.close(true);
    }, error => {
      this.errorMessage = error?.error?.message;
    });
  }
}