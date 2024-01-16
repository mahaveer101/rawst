import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdatProfileImageComponent } from 'app/views/profile/components/updat-profile-image/updat-profile-image.component';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-edit-comapany-logo',
  templateUrl: './edit-comapany-logo.component.html',
  styleUrls: ['./edit-comapany-logo.component.scss']
})
export class EditComapanyLogoComponent implements OnInit {
  fileList: File[] = [];
  listOfFiles: any[] = [];
  response: any;
  errorMessage: '';

  constructor(
    public dialogRef: MatDialogRef<UpdatProfileImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
  }

  saveOfficeWorkTime() {
    this.errorMessage = '';
    this.companyService.submitCompanyLogo(this.fileList).subscribe({
      next: (response: any) => {
        this.fileList = [];
        this.listOfFiles = [];
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

  onfileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
        this.fileList.push(selectedFile);
        this.listOfFiles.push(selectedFile.name);
      }
    }
  }

  removeSelectedFile(index: number) {
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
  }

}
