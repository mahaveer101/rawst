import { Component, OnInit, ViewChild } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AttendanceBarChart, AttendanceRecordPieChart } from '../../constants/dashboard.constants';
import { DashboardService } from './dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { ForceChangePasswordComponent } from '../force-change-password/force-change-password.component';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: egretAnimations
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userAnnouncementsList : any = [];
  response:any;
  attendenceRecord: any = {};
  lastSevenDaysSummary = AttendanceBarChart;
  todaySummary = AttendanceRecordPieChart;
  user: any = {};
  workingHours: any;
  timerWorker = new Worker(new URL('./dashboard.worker', import.meta.url));
  responseAnnouncement: any;
  displayedColumns= [
    'sNo',
    'announcement',
    'type',
    'actions'
  ]

  constructor(
    private dashboardService: DashboardService,
    public dialog: MatDialog,
    public jwtAuth: JwtAuthService
  ) {
    this.user = this.jwtAuth.getUser();
    if (this.user?.force_change_password === '1') {
      this.openForceChangePasswordForm();
    }
  }

  ngOnInit(): void {
    this.getAttendanceRecord();
  }

  getAttendanceRecord() {
    this.dashboardService.getAttendenceRecord().subscribe((res: any) => {
      this.attendenceRecord = structuredClone(res);
      this.userAnnouncementsList = new MatTableDataSource(res.user_announcements);
      this.userAnnouncementsList.paginator = this.paginator;
      this.displayWorkingHours(res);
      this.loadLastSevenDaysSummaryChart();
      this.loadTodaySummaryChart();
    });
  }

  loadLastSevenDaysSummaryChart() {
    const lastSevenDaysSummary = JSON.parse(JSON.stringify(AttendanceBarChart));
    lastSevenDaysSummary.xAxis[0].data = this.attendenceRecord?.previous_records?.label || [];
    const values = this.attendenceRecord?.previous_records?.value || [];

    for (const each of values) {
      lastSevenDaysSummary.series[0].data.push({
        value: each.hours,
        formattedValue: each.format_hours,
        itemStyle: {
          normal: { color: each.color }
        }
      });
    }
    lastSevenDaysSummary.tooltip.formatter = (params) => {
      return `${params.name}  ${params.data.formattedValue}`;
    }
    this.lastSevenDaysSummary = lastSevenDaysSummary;
  }

  loadTodaySummaryChart() {
    const todaySummary = JSON.parse(JSON.stringify(AttendanceRecordPieChart));
    const values = this.attendenceRecord?.today_record || [];
    for (const each of values) {
      todaySummary.series[0].data.push({
        value: each.value,
        name: each.label,
        hours: each.hours,
        itemStyle: {
          normal: { color: each.color }
        }
      });
    }
    todaySummary.tooltip.formatter = (params) => {
      return `${params.name}:  ${params.data.hours} ${params.percent}%`;
    }
    this.todaySummary = todaySummary;
  }

  displayWorkingHours(res) {
    const workingHours = res?.today_record?.find(each => each.label === 'Working Hours');
    if (workingHours) {
      const event = {
        hours: workingHours.hours,
        startTimer: !res.work_time_button?.start_button
      };
      if (typeof Worker !== 'undefined') {
        this.timerWorker.postMessage(event);
        this.timerWorker.onmessage = ({ data }) => {
          this.workingHours = data;
        };
      }
    }
  }

  openForceChangePasswordForm() {
    const dialogRef = this.dialog.open(ForceChangePasswordComponent,
      {
        width: '400px',
        disableClose: true
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {

      }
    });
  }

  onStartWork() {
    this.jwtAuth.startWork().subscribe({
      next: () => {
        this.getAttendanceRecord();
      }
    });
  }

  onStopWork() {
    this.jwtAuth.stopWork().subscribe({
      next: () => {
        this.getAttendanceRecord();
      }
    });
  }

  markAnnouncementRead(row) {
    this.dashboardService.markAnnouncementRead(row).subscribe({
      next: () => {
        this.getAttendanceRecord();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
