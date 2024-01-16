import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeListService } from '../employee-list/employee-list.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { matchValidatorForPassword } from 'app/shared/validators/custom-password.validator';

@Component({
  selector: 'app-employee-reset-password',
  templateUrl: './employee-reset-password.component.html',
  styleUrls: ['./employee-reset-password.component.scss']
})
export class EmployeeResetPasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeResetPasswordComponent>,
    private employeeListService: EmployeeListService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createChangePasswordForm();
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      password: ['',
        [Validators.required,
        Validators.pattern(regExps.password),
        matchValidatorForPassword('confirmPassword', true)
        ]],
      confirmPassword: ['',
        [Validators.required,
        matchValidatorForPassword('password')
        ]],
    })
  }

  onSubmitChangePasswordForm() {
    this.errorMessage = '';
    this.employeeListService.submitResetPassword(this.changePasswordForm.value, this.data.rowData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}

