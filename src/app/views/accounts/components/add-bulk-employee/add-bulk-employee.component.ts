import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeListService } from '../employee-list/employee-list.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bulk-employee',
  templateUrl: './add-bulk-employee.component.html',
  styleUrls: ['./add-bulk-employee.component.scss']
})
export class AddBulkEmployeeComponent implements OnInit {
  bulkEmployeeForm: any;
  fileNameBulkEmployes : any;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<AddBulkEmployeeComponent>,
    private employeeListService: EmployeeListService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  onfileChangedBulkEmployes(event) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.bulkEmployeeForm = selectedFile;
      this.fileNameBulkEmployes = selectedFile.name;
    }
  }

  removeSelectedFileBulkEmployee(){
    this.fileNameBulkEmployes = null;
    this.bulkEmployeeForm = null;
  }

  submitBulkEmployeeForm() {
    this.errorMessage= '';
    this.employeeListService.submitBulkEmployes(this.bulkEmployeeForm).subscribe({
      next: () => {
        this.bulkEmployeeForm = null;
        this.fileNameBulkEmployes = null;
        this.dialogRef.close(true);
      }, 
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
