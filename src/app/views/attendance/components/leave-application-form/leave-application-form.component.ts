import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { LeavesService } from '../leaves/leaves.service';

@Component({
  selector: 'app-leave-application-form',
  templateUrl: './leave-application-form.component.html',
  styleUrls: ['./leave-application-form.component.scss']
})
export class LeaveApplicationFormComponent implements OnInit {

  leaveForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LeaveApplicationFormComponent>,
    private leavesService: LeavesService
  ) { }

  ngOnInit() {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      sessionType: [''],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  onSubmitLeaveForm() {
    this.leavesService.submitLeaveApplication(this.leaveForm.value).subscribe(res => {
      this.dialogRef.close(true);
    });
  }

  onChangeLeaveType(event) {
    const leaveType = this.leaveForm.get('leaveType')?.value;
    if (['short_leave', 'comp_off'].includes(leaveType)) {
      this.leaveForm.get('sessionType').clearValidators();
      this.leaveForm.get('sessionType').updateValueAndValidity();
    } else {
      this.leaveForm.get('sessionType').setValidators([Validators.required]);
      this.leaveForm.get('sessionType').updateValueAndValidity();
    }
  }
}