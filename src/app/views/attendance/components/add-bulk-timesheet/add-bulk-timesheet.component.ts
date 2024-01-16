import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimesheetService } from '../timesheet/timesheet.service';

@Component({
  selector: 'app-add-bulk-timesheet',
  templateUrl: './add-bulk-timesheet.component.html',
  styleUrls: ['./add-bulk-timesheet.component.scss']
})
export class AddBulkTimesheetComponent implements OnInit {
  bulkTimesheetForm: any;
  fileNameBulkTimesheet: any;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<AddBulkTimesheetComponent>,
    private timesheetService: TimesheetService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  onfileChangedBulkTimesheet(event) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.bulkTimesheetForm = selectedFile;
      this.fileNameBulkTimesheet = selectedFile.name;
    }
  }

  removeSelectedFileBulkTimesheet() {
    this.fileNameBulkTimesheet = null;
    this.bulkTimesheetForm = null;
  }

  submitBulkTimesheetForm() {
    this.errorMessage = '';
    this.timesheetService.submitBulkTimesheet(this.bulkTimesheetForm).subscribe({
      next: () => {
        this.bulkTimesheetForm = null;
        this.fileNameBulkTimesheet = null;
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
