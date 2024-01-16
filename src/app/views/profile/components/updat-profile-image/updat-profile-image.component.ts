import { Component, Inject, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile/user-profile.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updat-profile-image',
  templateUrl: './updat-profile-image.component.html',
  styleUrls: ['./updat-profile-image.component.scss']
})
export class UpdatProfileImageComponent implements OnInit {

  fileList: File[] = [];
  listOfFiles: any[] = [];
  response: any;
  errorMessage: '';

  constructor(
    public dialogRef: MatDialogRef<UpdatProfileImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit(): void {
  }

  saveOfficeWorkTime() {
    this.errorMessage = '';
    this.userProfileService.submitProfileImage(this.fileList).subscribe({
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
