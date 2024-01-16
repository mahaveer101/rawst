import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.scss']
})
export class EditGradeComponent implements OnInit {

  gradeTypesForm: FormGroup;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.createGradeTypesForm();
    if (this.data.companyGrade) {
      this.gradeTypesForm.get('aPlusGrade').setValue(this.data.companyGrade[0]?.percentage);
      this.gradeTypesForm.get('aGrade').setValue(this.data.companyGrade[1]?.percentage);
      this.gradeTypesForm.get('bPlusGrade').setValue(this.data.companyGrade[2]?.percentage);
      this.gradeTypesForm.get('bGrade').setValue(this.data.companyGrade[3]?.percentage);
      this.gradeTypesForm.get('cGrade').setValue(this.data.companyGrade[4]?.percentage);
    }
  }

  createGradeTypesForm() {
    this.gradeTypesForm = this.fb.group({
      aPlusGrade: ['', Validators.required],
      aGrade: ['', Validators.required],
      bPlusGrade: ['', Validators.required],
      bGrade: ['', Validators.required],
      cGrade: ['', Validators.required],
    });
  }

  onSubmiGradeTypesForm() {
    this.errorMessage = '';
    this.companyService.updateGradeTypes(this.gradeTypesForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
