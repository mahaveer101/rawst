import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeavesService } from '../leaves/leaves.service';

@Component({
  selector: 'app-add-bulk-leaves',
  templateUrl: './add-bulk-leaves.component.html',
  styleUrls: ['./add-bulk-leaves.component.scss']
})
export class AddBulkLeavesComponent implements OnInit {
  bulkLeavesForm: any;
  fileNameBulkLeaves : any;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<AddBulkLeavesComponent>,
    private leavesService: LeavesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  onfileChangedBulkLeaves(event) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.bulkLeavesForm = selectedFile;
      this.fileNameBulkLeaves = selectedFile.name;
    }
  }

  removeSelectedFileBulkLeaves(){
    this.fileNameBulkLeaves = null;
    this.bulkLeavesForm = null;
  }

  submitBulkLeavesForm() {
    this.errorMessage= '';
    this.leavesService.submitBulkLeaves(this.bulkLeavesForm).subscribe({
      next: () => {
        this.bulkLeavesForm = null;
        this.fileNameBulkLeaves = null;
        this.dialogRef.close(true);
      }, 
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
