import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoticeBoardAnnouncementService } from '../notice-board-announcement/notice-board-announcement.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-updateannouncements',
  templateUrl: './add-updateannouncements.component.html',
  styleUrls: ['./add-updateannouncements.component.scss'],

})
export class AddUpdateannouncementsComponent implements OnInit {
  announcementsForm: FormGroup;
  departments: [];
  errorMessage = '';
  name = "Create"
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUpdateannouncementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noticeBoardAnnouncementService: NoticeBoardAnnouncementService
  ) { }

  ngOnInit(): void {
    this.createAnnouncementForm();
    this.setDefaultData(this.data.defaultData);
    if (this.data.isAdd) {
      this.announcementsForm.addControl('departmentId', new FormControl('', Validators.required));
    }
    if (this.data.isEdit) {
      this.name = "Update";
      this.announcementsForm.get('announcement').setValue(this.data?.rowData?.announcement);
      this.announcementsForm.get('type').setValue(this.data?.rowData?.type);
    }
  }

  createAnnouncementForm() {
    this.announcementsForm = this.fb.group({
      announcement: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  setDefaultData(defaultData) {
    this.departments = defaultData.departments || [];
  }

  onSubmitAnnouncementsForm() {
    this.errorMessage = '';
    if (this.data.isAdd) {
      this.noticeBoardAnnouncementService.submitAnnouncementForm(this.announcementsForm.value).subscribe(res => {
        this.dialogRef.close(true);
      }, error => {
        this.errorMessage = error?.error?.message;
      });
    }else {

  this.noticeBoardAnnouncementService.updateAnnouncements(this.announcementsForm.value, this.data.rowData).subscribe({
    next: () => {

      this.dialogRef.close(true);
    },
    error: (error) => {
      this.errorMessage = error?.error?.message;
    }
  });
}
  }
}
