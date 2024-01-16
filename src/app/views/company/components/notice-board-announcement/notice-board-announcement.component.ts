import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticeBoardAnnouncementService } from './notice-board-announcement.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateannouncementsComponent } from '../add-updateannouncements/add-updateannouncements.component';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-notice-board-announcement',
  templateUrl: './notice-board-announcement.component.html',
  styleUrls: ['./notice-board-announcement.component.scss'],
  animations: egretAnimations
})
export class NoticeBoardAnnouncementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  announcementsList: any;
  response: any;
  searchValue: any;
  displayedColumns = [
    "sNo",
    "empNo",
    "empName",
    "announcement",
    'type',
    "actions"

  ]
  constructor(
    private noticeBoardAnnouncementService: NoticeBoardAnnouncementService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAnnouncementsList();
  }

  getAnnouncementsList() {
    this.noticeBoardAnnouncementService.getAnnouncementsList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.announcementsList = new MatTableDataSource(response.announcements);
      this.announcementsList.paginator = this.paginator;
    });
  }

  onSearchValue() {
    this.noticeBoardAnnouncementService.getAnnouncementBySearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.announcementsList = new MatTableDataSource(response.announcements);
        this.announcementsList.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearSearchValue() {
    this.searchValue = '';
    this.getAnnouncementsList();
  }

  addAnnouncement() {
    const dialogRef = this.dialog.open(AddUpdateannouncementsComponent,
      {
        width: '500px',
        data: {
          isAdd: true,
          defaultData: this.response
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAnnouncementsList();
      }
    });
  }

  updateAnnouncements(row){
    const dialogRef = this.dialog.open(AddUpdateannouncementsComponent,
      {
        width: '500px',
        data: {
          isEdit: true,
          defaultData: this.response,
          rowData: row
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAnnouncementsList();
      }
    });
  }
}
