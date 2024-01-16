import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PreviousTaxIncentiveService } from '../previous-tax-incentive/previous-tax-incentive.service';

@Component({
  selector: 'app-add-bulk-previous-incentive',
  templateUrl: './add-bulk-previous-incentive.component.html',
  styleUrls: ['./add-bulk-previous-incentive.component.scss']
})
export class AddBulkPreviousIncentiveComponent implements OnInit {

  bulkPreviousIncentiveForm: any;
  fileNameBulkPreviousIncentive : any;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<AddBulkPreviousIncentiveComponent>,
    private previousTaxIncentiveService: PreviousTaxIncentiveService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  onfileChangedBulkPreviousIncentive(event) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.bulkPreviousIncentiveForm = selectedFile;
      this.fileNameBulkPreviousIncentive = selectedFile.name;
    }
  }

  removeSelectedFileBulkPreviousIncentive(){
    this.fileNameBulkPreviousIncentive = null;
    this.bulkPreviousIncentiveForm = null;
  }

  submitBulkPreviousIncentiveForm() {
    this.errorMessage= '';
    this.previousTaxIncentiveService.submitBulkPreviousIncentive(this.bulkPreviousIncentiveForm).subscribe({
      next: () => {
        this.bulkPreviousIncentiveForm = null;
        this.fileNameBulkPreviousIncentive = null;
        this.dialogRef.close(true);
      }, 
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
