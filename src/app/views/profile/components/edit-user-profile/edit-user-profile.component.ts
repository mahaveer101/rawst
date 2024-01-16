import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { bloodGroupTypes } from 'app/views/accounts/constants/employee-list-constants';
import { UserProfileService } from '../user-profile/user-profile.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  bloodGroupTypes = bloodGroupTypes;
  genderList = [];
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit(): void {
    this.createUserProfileForm();
    if (this.data) {
      this.setSavedFormData(this.data);
    }
  }
  createUserProfileForm() {
    this.userProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      father_name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(regExps.phonePattern)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      blood_group: ['', Validators.required]
    });
  }

  setSavedFormData(rowData) {
    this.userProfileForm.get('name').setValue(rowData.name);
    this.userProfileForm.get('father_name').setValue(rowData.father_name);
    this.userProfileForm.get('phone').setValue(rowData.phone);
    this.userProfileForm.get('dob').setValue(rowData.dob);
    this.userProfileForm.get('gender').setValue(rowData.gender);
    this.userProfileForm.get('education').setValue(rowData.education);
    this.userProfileForm.get('blood_group').setValue(rowData.blood_group);
  }

  onSubmitUserProfileForm() {
    this.errorMessage = '';
    this.userProfileService.updateUserProfile(this.userProfileForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
