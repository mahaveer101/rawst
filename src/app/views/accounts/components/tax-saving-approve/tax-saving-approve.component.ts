import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxSavingListService } from '../tax-saving-list/tax-saving-list.service';

@Component({
  selector: 'app-tax-saving-approve',
  templateUrl: './tax-saving-approve.component.html',
  styleUrls: ['./tax-saving-approve.component.scss']
})
export class TaxSavingApproveComponent implements OnInit {

  approveFormGroup = this.fb.group({
    approve_amount: new FormControl('', [Validators.required])
  });
  errorMessage = '';
  taxSavingDetails: any;
  title = 'Approve';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaxSavingApproveComponent>,
    private taxSavingListService: TaxSavingListService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.title = 'Edit';
    }
    this.taxSavingDetails = this.data.row;
    this.approveFormGroup.get('approve_amount').setValue(this.taxSavingDetails?.approve_amount || '');
  }


  onSubmitApproveForm() {
    this.errorMessage = '';
    if (this.data.isApprove) {
      if (this.validateAmount()) {
        this.taxSavingListService.updateTaxSavingApproveStatus(this.taxSavingDetails.tax_saving_id, this.approveFormGroup.value).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.errorMessage = error?.error?.message;
          }
        });
      } else {
        this.errorMessage = 'Approve amount should be less than or equal to total amount.';
      }
    } else {
      this.taxSavingListService.updateTaxSavingAmount(this.taxSavingDetails.tax_saving_id, this.approveFormGroup.value).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.errorMessage = error?.error?.message;
        }
      });
    }
  }

  validateAmount() {
    return +this.approveFormGroup?.value?.approve_amount !== 0 && +this.approveFormGroup.value.approve_amount <= +this.taxSavingDetails?.amount;
  }

}
