import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { matchValidatorForPassword } from 'app/shared/validators/custom-password.validator';
import { DashboardService } from '../dashboard/dashboard.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-force-change-password',
  templateUrl: './force-change-password.component.html',
  styleUrls: ['./force-change-password.component.scss']
})
export class ForceChangePasswordComponent implements OnInit {

  forcePasswordForm: any;
  errorMessage: '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ForceChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dashboardService: DashboardService,
    private jwtAuth: JwtAuthService
  ) { }

  ngOnInit(): void {
    this.createForcePasswordForm();
  }

  createForcePasswordForm() {
    this.forcePasswordForm = this.fb.group({
      password: ['',
        [Validators.required,
        Validators.pattern(regExps.password),
        matchValidatorForPassword('c_password', true)
        ]],
        c_password: ['',
        [Validators.required,
        matchValidatorForPassword('password')
        ]],
    })
  }

  onSubmitForceChangePasswordForm() {
    this.errorMessage = '';
    this.dashboardService.submitResetPassword(this.forcePasswordForm.value).subscribe({
      next: (response: any) => {
        this.jwtAuth.setForcePasswordChange(response?.data?.user);
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
