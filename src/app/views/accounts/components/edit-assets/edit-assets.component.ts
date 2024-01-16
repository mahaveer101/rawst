import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssetsListService } from '../assets-list/assets-list.service';
import { regExps } from 'app/shared/constants/regexps';

@Component({
  selector: 'app-edit-assets',
  templateUrl: './edit-assets.component.html',
  styleUrls: ['./edit-assets.component.scss']
})
export class EditAssetsComponent implements OnInit {
  assetForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditAssetsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assetsListService: AssetsListService
  ) { }

  ngOnInit(): void {
    this.createAssetForm();
    this.setSavedFormData(this.data.selectedAsset);
  }

  createAssetForm() {
    this.assetForm = this.fb.group({
      asset_name: ['', Validators.required],
      asset_code: ['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      location: ['', [Validators.required, Validators.pattern(regExps.alphaNumeric)]],
      category: ['', Validators.required],
      asset_type: ['',Validators.required,],
      condition: ['', Validators.required]
    });
  }

  setSavedFormData(selectedAsset) {
    this.assetForm.get('asset_name').setValue(selectedAsset.asset_name);
    this.assetForm.get('asset_code').setValue(selectedAsset.asset_code);
    this.assetForm.get('location').setValue(selectedAsset.location);
    this.assetForm.get('category').setValue(selectedAsset.category);
    this.assetForm.get('asset_type').setValue(selectedAsset.asset_type);
    this.assetForm.get('condition').setValue(selectedAsset.condition);
  }

  onSubmitEAssetsForm() {
    this.errorMessage = '';
    this.assetsListService.updateAssetsDetails(this.data.userId, this.data.selectedAsset, this.assetForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }
}