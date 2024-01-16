import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvancedPaymentService } from '../advanced-payment/advanced-payment.service';
import { regExps } from 'app/shared/constants/regexps';
import { Moment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-advance-payment',
  templateUrl: './add-advance-payment.component.html',
  styleUrls: ['./add-advance-payment.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, 
      useValue: MY_FORMATS
    }
  ],
})
export class AddAdvancePaymentComponent implements OnInit {
  advancePaymentForm: FormGroup;
  errorMessage = '';
  users = [];
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAdvancePaymentComponent>,
    private advancedPaymentService: AdvancedPaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createAdvancePaymentForm();
    this.setDefaultData(this.data);
  }

  createAdvancePaymentForm() {
    this.advancePaymentForm = this.fb.group({
      payment_to: ['', Validators.required],
      payment_amount:  ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      installment_amount:  ['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      start_month: [moment(), Validators.required]
    });
  }
  
  setDefaultData(dropdownData) {
    this.users = dropdownData.users || [];
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.advancePaymentForm.get('start_month').value!;
    ctrlValue.date(1);
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.advancePaymentForm.get('start_month').setValue(ctrlValue);
    datepicker.close();
  }

  onSubmitAdvancePaymentForm() {
    this.errorMessage = '';
    this.advancedPaymentService.submitAdvancePayment(this.advancePaymentForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
