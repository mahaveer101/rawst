import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { PreviousTaxIncentiveService } from '../previous-tax-incentive/previous-tax-incentive.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-previous-incentives',
  templateUrl: './add-previous-incentives.component.html',
  styleUrls: ['./add-previous-incentives.component.scss']
})
export class AddPreviousIncentivesComponent implements OnInit {
  previousIncentiveForm : FormGroup;
  errorMessage : any;
  financialYears = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPreviousIncentivesComponent>,
    private previousTaxIncentiveService: PreviousTaxIncentiveService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.prepareFinancialYears();
    this.createPreviousIncentiveForm();
    
    this.previousIncentiveForm.get('financial_year').setValue(this.data?.savedResponse?.tax_and_incentive?.financial_year);
    this.previousIncentiveForm.get('total_incentive').setValue(this.data?.savedResponse?.tax_and_incentive?.total_incentive);
    this.previousIncentiveForm.get('previous_incentive_given').setValue(this.data?.savedResponse?.tax_and_incentive?.previous_incentive_given);
  }

  prepareFinancialYears() {
    let year = +moment().format('YYYY');
    for (let counter = 0; counter < 3; counter++) {
      this.financialYears.push(`${year}-${year+1}`);
      year++;
    }
  }

  createPreviousIncentiveForm(){
    this.previousIncentiveForm = this.fb.group({
      financial_year: ['', Validators.required],
      total_incentive:  ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      previous_incentive_given:  ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]]
    });
  }

  onSubmitPreviousIncentiveForm(){
    this.errorMessage = '';
    this.previousTaxIncentiveService.submitPreviousIncentive(this.previousIncentiveForm.value, this.data.user_id).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
