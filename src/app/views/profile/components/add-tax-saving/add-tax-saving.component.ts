import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { TaxService } from '../tax/tax.service';

@Component({
  selector: 'app-add-tax-saving',
  templateUrl: './add-tax-saving.component.html',
  styleUrls: ['./add-tax-saving.component.scss'],
  animations: egretAnimations
})
export class AddTaxSavingComponent implements OnInit {

  taxSavingForm: FormGroup;
  taxSavingYears = [
    '2022-2023',
    '2023-2024',
    '2024-2025'
  ];
  taxSavingOptions = [];
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTaxSavingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taxService: TaxService
  ) { }

  ngOnInit(): void {
    this.createTaxSavingForm();
    this.taxSavingOptions = this.data?.tax_saving_options;
  }

  createTaxSavingForm() {
    this.taxSavingForm = this.fb.group({
      amount: ['', Validators.required],
      saving_year: ['', Validators.required],
      saving_type_id: ['', Validators.required],
    });
  }

  onSubmitTaxSavingForm() {
    this.errorMessage = '';
    this.taxService.submitTaxSavingForm(this.taxSavingForm.value).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
