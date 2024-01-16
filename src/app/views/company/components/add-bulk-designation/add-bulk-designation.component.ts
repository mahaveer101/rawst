import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DesignationListService } from '../designation-list/designation-list.service';

@Component({
  selector: 'app-add-bulk-designation',
  templateUrl: './add-bulk-designation.component.html',
  styleUrls: ['./add-bulk-designation.component.scss']
})
export class AddBulkDesignationComponent implements OnInit {
  bulkDesignationForm: any;
  fileNameBulkDesignation : any;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<AddBulkDesignationComponent>,
    private designationListService: DesignationListService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  onfileChangedBulkDesignation(event) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.bulkDesignationForm = selectedFile;
      this.fileNameBulkDesignation = selectedFile.name;
    }
  }

  removeSelectedFileBulkDesignation(){
    this.fileNameBulkDesignation = null;
    this.bulkDesignationForm = null;
  }

  submitBulkDesignationForm() {
    this.errorMessage= '';
    this.designationListService.submitBulkDesignation(this.bulkDesignationForm).subscribe({
      next: () => {
        this.bulkDesignationForm = null;
        this.fileNameBulkDesignation = null;
        this.dialogRef.close(true);
      }, 
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
