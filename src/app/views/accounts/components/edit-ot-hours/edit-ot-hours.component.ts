import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllTeamsPageService } from '../all-teams-page/all-teams-page.service';
import { regExps } from 'app/shared/constants/regexps';

@Component({
  selector: 'app-edit-ot-hours',
  templateUrl: './edit-ot-hours.component.html',
  styleUrls: ['./edit-ot-hours.component.scss']
})
export class EditOtHoursComponent implements OnInit {
  otHoursForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditOtHoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private allTeamsPageService: AllTeamsPageService
  ) { }

  ngOnInit(): void {
    this.createOtHoursForm();
    this.otHoursForm.get('ot_hours').setValue(this.data?.day?.ot_hours);
  }

  createOtHoursForm(){
    this.otHoursForm = this.fb.group({
      ot_hours:  ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      ot_hours_reason : ['',Validators.required]
    })
  }

  onSubmit(){
    this.allTeamsPageService.updateOtHours(this.data.user, this.data.day, this.otHoursForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      }
    });
  }

}
