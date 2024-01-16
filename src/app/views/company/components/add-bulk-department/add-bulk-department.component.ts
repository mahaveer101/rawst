import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentListService } from '../department-list/department-list.service';

@Component({
  selector: 'app-add-bulk-department',
  templateUrl: './add-bulk-department.component.html',
  styleUrls: ['./add-bulk-department.component.scss']
})
export class AddBulkDepartmentComponent implements OnInit {
  bulkDepartmentForm: any;
  fileNameBulkDepartment : any;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<AddBulkDepartmentComponent>,
    private departmentListService: DepartmentListService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  onfileChangedBulkDepartment(event) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.bulkDepartmentForm = selectedFile;
      this.fileNameBulkDepartment = selectedFile.name;
    }
  }

  removeSelectedFileBulkEmployee(){
    this.fileNameBulkDepartment = null;
    this.bulkDepartmentForm = null;
  }

  submitBulkDepartmentForm() {
    this.errorMessage= '';
    this.departmentListService.submitBulkDepartments(this.bulkDepartmentForm).subscribe({
      next: () => {
        this.bulkDepartmentForm = null;
        this.fileNameBulkDepartment = null;
        this.dialogRef.close(true);
      }, 
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }


}
