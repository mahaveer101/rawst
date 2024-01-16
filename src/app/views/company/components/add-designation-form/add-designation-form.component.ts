import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DesignationListService } from '../designation-list/designation-list.service';

@Component({
  selector: 'app-add-designation-form',
  templateUrl: './add-designation-form.component.html',
  styleUrls: ['./add-designation-form.component.scss']
})
export class AddDesignationFormComponent implements OnInit {

  designationForm: FormGroup;
  departments = [];
  errorMessage = '';
  name = "Create"
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDesignationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private designationListService: DesignationListService
  ) { }

  ngOnInit(): void {
    this.createDesignationForm();
    this.setDefaultData(this.data);
    if (this.data.isEdit) {
      this.name = "Update";
      this.designationForm.get('departmentId').setValue(this.data?.rowData?.department_id);
      this.designationForm.get('designationName').setValue(this.data?.rowData?.designation_name);
      this.designationForm.get('attendance').setValue(this.data?.rowData?.check_attendance === '1'? true: false);
    }
  }

  createDesignationForm() {
    this.designationForm = this.fb.group({
      departmentId: ['', Validators.required],
      designationName: ['', Validators.required],
      attendance: [true, Validators.required],
    });
  }

  setDefaultData(dropdownData) {
    this.departments = dropdownData.departments || [];
  }

  onSubmitDesignationForm() {
    this.errorMessage = '';
    if (this.data.isAdd) {
      this.designationListService.submitDesignationForm(this.designationForm.value).subscribe(res => {
        this.dialogRef.close(true);
      }, error => {
        this.errorMessage = error?.error?.message;
      });
    } else {
      this.designationListService.updateDesignation(this.designationForm.value, this.data.rowData).subscribe(res => {
        this.dialogRef.close(true);
      }, error => {
        this.errorMessage = error?.error?.message;
      });
    }
  }

}
