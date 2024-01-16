import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeListService } from '../employee-list/employee-list.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-pf-esic',
  templateUrl: './edit-pf-esic.component.html',
  styleUrls: ['./edit-pf-esic.component.scss']
})
export class EditPfEsicComponent implements OnInit {
  pfEsicForm: FormGroup;
  errorMessage: '';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPfEsicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeListService: EmployeeListService
  ) { }

  ngOnInit(): void {
    this.createPfEsicForm();
    if (this.data.rowData) {
      this.setSavedFormData(this.data.rowData);
    }
  }

  createPfEsicForm() {
    this.pfEsicForm = this.fb.group({
      pfNo: ['', [Validators.required]],
      pfDoj: ['', [Validators.required]],
      esicNo: ['', [Validators.required]],
      esicDoj: ['', [Validators.required]],
    });
  }

  setSavedFormData(rowData) {
    this.pfEsicForm.get('pfNo').setValue(rowData.pf_no);
    this.pfEsicForm.get('pfDoj').setValue(rowData.pf_doj);
    this.pfEsicForm.get('esicNo').setValue(rowData.esic_no);
    this.pfEsicForm.get('esicDoj').setValue(rowData.esic_doj);
  }

  onSubmitPfEsicForm(){
    this.errorMessage = '';
    this.employeeListService.updatePfEsic(this.pfEsicForm.value, this.data.rowData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

}
