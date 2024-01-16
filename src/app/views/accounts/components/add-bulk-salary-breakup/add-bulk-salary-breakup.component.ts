import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalaryBreakupService } from '../salary-breakup/salary-breakup.service';

@Component({
  selector: 'app-add-bulk-salary-breakup',
  templateUrl: './add-bulk-salary-breakup.component.html',
  styleUrls: ['./add-bulk-salary-breakup.component.scss']
})
export class AddBulkSalaryBreakupComponent implements OnInit {

  bulkSalaryBreakupForm: any;
  fileNameBulkSalaryBreakup : any;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<AddBulkSalaryBreakupComponent>,
    private salaryBreakupService: SalaryBreakupService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  onfileChangedBulkSalaryBreakup(event) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.bulkSalaryBreakupForm = selectedFile;
      this.fileNameBulkSalaryBreakup = selectedFile.name;
    }
  }

  removeSelectedFileBulkEmployee(){
    this.fileNameBulkSalaryBreakup = null;
    this.bulkSalaryBreakupForm = null;
  }

  submitBulkSalaryBreakupForm() {
    this.errorMessage= '';
    this.salaryBreakupService.submitBulkSalaryBreakups(this.bulkSalaryBreakupForm).subscribe({
      next: () => {
        this.bulkSalaryBreakupForm = null;
        this.fileNameBulkSalaryBreakup = null;
        this.dialogRef.close(true);
      }, 
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }


}
