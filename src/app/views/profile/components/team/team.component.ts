import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import * as moment from 'moment';
import { ViewEmployeesComponent } from '../view-employees/view-employees.component';
import { TeamService } from './team.service';
import { EditAttendanceComponent } from 'app/views/accounts/components/edit-attendance/edit-attendance.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations: egretAnimations,
  encapsulation: ViewEncapsulation.Emulated
})
export class TeamComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  attendanceDate = new Date();
  response: any;
  timesheet: any;
  isNextOrPreviousClicked = false;

  constructor(
    private teamService: TeamService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getTeamList();
  }

  getTeamList() {
    this.teamService.getTeamList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.timesheet = response?.time_sheet || [];
      this.attendanceDate = response?.time_sheet[0]?.time_sheet[0]?.attendence_date;
    });
  }

  viewEmployeesList(list) {
    const dialogRef = this.dialog.open(ViewEmployeesComponent,
      {
        width: '600px',
        data: list || {}
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getTeamList();
      }
    });
  }

  goToNextOrPreviousMonth(action) {
    this.isNextOrPreviousClicked = true;
    if(action === 'next') {
      this.attendanceDate = moment(this.attendanceDate).add(1, 'M').toDate();
    } else {
      this.attendanceDate = moment(this.attendanceDate).subtract(1, 'M').toDate();
    }
    this.getTimesheetByDate();
  }

  getTimesheetByDate() {
    this.teamService.getTimesheetByMonth(moment(this.attendanceDate).format('yyyy-MM')).subscribe({
      next: (response: any) => {
        this.timesheet = response?.time_sheet;
      }
    })
  }

  updateAttendance(user, day) {
    const dialogRef = this.dialog.open(EditAttendanceComponent,
      {
        width: '500px',
        data: {
          user,
          day
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (this.isNextOrPreviousClicked) {
          this.getTimesheetByDate();
        } else {
          this.getTeamList();
        }
      }
    });
  }
}