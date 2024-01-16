import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PreviousTaxIncentiveService } from '../previous-tax-incentive/previous-tax-incentive.service';
import { regExps } from 'app/shared/constants/regexps';
import * as moment from 'moment';

@Component({
  selector: 'app-add-previous-tax',
  templateUrl: './add-previous-tax.component.html',
  styleUrls: ['./add-previous-tax.component.scss']
})
export class AddPreviousTaxComponent implements OnInit {
  previousTaxForm : FormGroup;
  errorMessage : any;
  financialYears = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPreviousTaxComponent>,
    private previousTaxIncentiveService: PreviousTaxIncentiveService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.prepareFinancialYears();
    this.createPreviousTaxForm();
    this.previousTaxForm.get('financial_year').setValue(this.data?.savedResponse?.tax_and_incentive?.financial_year);
    this.previousTaxForm.get('total_tax').setValue(this.data?.savedResponse?.tax_and_incentive?.total_tax);
    this.previousTaxForm.get('previous_tax_deduction').setValue(this.data?.savedResponse?.tax_and_incentive?.previous_tax_deduction);
  }

  prepareFinancialYears() {
    let year = +moment().format('YYYY');
    for (let counter = 0; counter < 3; counter++) {
      this.financialYears.push(`${year}-${year+1}`);
      year++;
    }
  }

  createPreviousTaxForm(){
    this.previousTaxForm = this.fb.group({
      financial_year: ['', Validators.required],
      total_tax:  ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      previous_tax_deduction:  ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]]
    });
  }

  onSubmitPreviousTaxForm(){
    this.errorMessage = '';
    this.previousTaxIncentiveService.submitPreviousTax(this.previousTaxForm.value, this.data.user_id).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
