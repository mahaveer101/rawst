import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { DepartmentListService } from '../department-list/department-list.service';

@Component({
  selector: 'app-add-department-form',
  templateUrl: './add-department-form.component.html',
  styleUrls: ['./add-department-form.component.scss']
})
export class AddDepartmentFormComponent implements OnInit {

  departmentForm: FormGroup;
  errorMessage: '';
  name = "Create"

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDepartmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private departmentListService: DepartmentListService  
    ) { }

  ngOnInit(): void {
    this.createDepartmentForm();
    if (this.data?.isEdit) {
      this.name = "Update";
      this.departmentForm.get('departmentName').setValue(this.data?.rowData?.department_name);
      this.departmentForm.get('workingDays').setValue(this.data?.rowData?.working_days);
      this.departmentForm.get('breakTime').setValue(this.data?.rowData?.break_time);
      this.departmentForm.get('showHolidayList').setValue(this.data?.rowData?.show_holiday_list === '1'? true: false);
    }
  }

  createDepartmentForm() {
    this.departmentForm = this.fb.group({
      departmentName:['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      workingDays:['', [Validators.required, Validators.pattern(regExps.oneToSevenPattern)]],
      breakTime:['', [Validators.required, Validators.pattern(regExps.digitsPattern)]],
      showHolidayList:[false, [Validators.required]],
    });
  }
 
  onSubmitDepartmentForm(){
    this.errorMessage = '';
    if (this.data.isAdd) {
      this.departmentListService.submitDepartmentForm(this.departmentForm.value).subscribe(res => {
        this.dialogRef.close(true);
      }, error => {
        this.errorMessage = error?.error?.message;
      });
    } else {
      this.departmentListService.updateDepartment(this.departmentForm.value, this.data.rowData).subscribe(res => {
        this.dialogRef.close(true);
      }, error => {
        this.errorMessage = error?.error?.message;
      });
    }
  }

}
