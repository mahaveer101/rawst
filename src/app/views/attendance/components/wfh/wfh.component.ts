import { Component, OnInit, TemplateRef } from '@angular/core';
import { WfhService } from './wfh.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wfh',
  templateUrl: './wfh.component.html',
  styleUrls: ['./wfh.component.scss']
})
export class WFHComponent implements OnInit {
  response: any;
  prevRecordsResponse: any;
  myWfhResponse: any;
  wfhUserList: any = [];
  wfhApprovedList: any = [];
  myWfhList: any = [];
  selectedItems = [];
  selectAll = false;
  errorMessage = ''
  prevDate = moment().subtract(1, 'days');
  myWfhFromDate = moment().subtract(1, 'days');
  myWfhToDate = moment().subtract(1, 'days');
  aprovedWfhDisplayedColumns =[
    'sNo',
    'user_name',
    'late_login_time',
    'working_hours',
    'ot_hours',
    'status',
    'actions'
  ];

  myWfhDisplayedColumns =[
    'sNo',
    'reporting_manager',
    'created_at',
    'late_login_time',
    'working_hours',
    'ot_hours',
    'status'
  ];

  constructor(
    private wfhService: WfhService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getWfhAttendanceList();
    this.getWfhAttendanceApprove(this.prevDate);
    this.getMyWfh(this.myWfhFromDate, this.myWfhToDate);
  }

  getWfhAttendanceList() {
    this.wfhService.getWfhAttendance().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.wfhUserList = response.user_records || [];
    });
  }

  onChangePrevDate() {
    this.getWfhAttendanceApprove(this.prevDate);
  }

  getWfhAttendanceApprove(prevDate) {
    this.wfhService.getWfhAttendanceApprove(prevDate).subscribe((response: any) => {
      this.prevRecordsResponse = structuredClone(response);
      this.wfhApprovedList = response.user_records || [];
    });
  }

  onChangeMyWfhDate(event) {
    if (event.value) {
      this.getMyWfh(this.myWfhFromDate, event.value);
    }
  }

  getMyWfh(fromDate, toDate) {
    this.wfhService.getMyWfh(fromDate, toDate).subscribe((response: any) => {
      this.myWfhResponse = structuredClone(response);
      this.myWfhList = response.user_records || [];
    });
  }
  
  getWfh(id) {
    const user = this.response.users.find(each => +each.id === +id);
    return user?.name;
  }

  getPrevRecordUser(id) {
    const user = this.prevRecordsResponse.users.find(each => +each.id === +id);
    return user?.name;
  }

  selectOrDeselect(event) {
    if (event.checked) {
      this.selectedItems = this.wfhUserList.map((each: any) => each?.user_id);
    } else {
      this.selectedItems = [];
    }
  }

  onSelectionChange() {
    this.selectAll = this.selectedItems.length === this.wfhUserList.length;
  }

  onApproveWfh() {
    this.errorMessage = '';
    this.wfhService.submitWfh(this.response.attendance_date, this.selectedItems).subscribe({
      next: () => {
        this.selectedItems = [];
        this.selectAll = false;
        this.getWfhAttendanceList();
        this.getWfhAttendanceApprove(this.prevDate);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message;
      }
    });
  }

  openApproveConfirmation(user_id, templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.wfhService.updatePrevWfh(user_id, this.prevDate).subscribe({
          next: (response: any) => {
            this.getWfhAttendanceList();
          this.getWfhAttendanceApprove(this.prevDate);
          }
        })
      }
    });
  }
}
