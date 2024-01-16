import { Component, Inject, OnInit } from '@angular/core';
import { PreviousTaxIncentiveService } from '../previous-tax-incentive/previous-tax-incentive.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bulk-previous-tax',
  templateUrl: './add-bulk-previous-tax.component.html',
  styleUrls: ['./add-bulk-previous-tax.component.scss']
})
export class AddBulkPreviousTaxComponent implements OnInit {
  bulkPreviousTaxForm: any;
  fileNameBulkPreviousTax: any;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<AddBulkPreviousTaxComponent>,
    private previousTaxIncentiveService: PreviousTaxIncentiveService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  onfileChangedBulkPreviousTax(event) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.bulkPreviousTaxForm = selectedFile;
      this.fileNameBulkPreviousTax = selectedFile.name;
    }
  }

  removeSelectedFileBulkPreviousTax() {
    this.fileNameBulkPreviousTax = null;
    this.bulkPreviousTaxForm = null;
  }

  submitBulkPreviousTaxForm() {
    this.errorMessage = '';
    this.previousTaxIncentiveService.submitBulkPreviousTax(this.bulkPreviousTaxForm).subscribe({
      next: () => {
        this.bulkPreviousTaxForm = null;
        this.fileNameBulkPreviousTax = null;
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
