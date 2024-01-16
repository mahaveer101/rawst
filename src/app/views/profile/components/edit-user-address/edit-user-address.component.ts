import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regExps } from 'app/shared/constants/regexps';
import { UserProfileService } from '../user-profile/user-profile.service';

@Component({
  selector: 'app-edit-user-address',
  templateUrl: './edit-user-address.component.html',
  styleUrls: ['./edit-user-address.component.scss']
})
export class EditUserAddressComponent implements OnInit {
userAddressForm: FormGroup;
errorMessage = '';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit(): void {
    this.createUserAddressForm();
    if (this.data) {
      this.setSavedFormData(this.data);
    }
  }

  createUserAddressForm(){
    this.userAddressForm = this.fb.group({
      pincode: ['', [Validators.required, Validators.pattern(regExps.pincode)]],
      city : ['', Validators.required],
      state : ['', Validators.required],
      street_address : ['', Validators.required],
      country : ['', Validators.required]
    })
  }
  
  setSavedFormData(rowData) {
      this.userAddressForm.get('pincode').setValue(rowData.pincode);
      this.userAddressForm.get('city').setValue(rowData.city);
      this.userAddressForm.get('state').setValue(rowData.state);
      this.userAddressForm.get('street_address').setValue(rowData.street_address);
      this.userAddressForm.get('country').setValue(rowData.country);
  }

  onSubmitUserAddressForm(){
    this.errorMessage = '';
    this.userProfileService.updateUserAddress(this.userAddressForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}
