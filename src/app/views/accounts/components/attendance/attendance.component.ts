import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from './attendance.service';
import { FilesService } from 'app/shared/services/files/files.service';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as moment from 'moment';
import { EditAttendanceComponent } from '../edit-attendance/edit-attendance.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, 
      useValue: MY_FORMATS
    }
  ],
})
export class AttendanceComponent implements OnInit {
  departments = [];
  searchForm: FormGroup = new FormGroup({
    date: new FormControl(moment(), [Validators.required]),
    department_id: new FormControl('', [Validators.required])
  });
  response: any;
  timesheet = [];
  constructor(
    private attendanceService: AttendanceService,
    private filesService: FilesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.attendanceService.getDepartmentList().subscribe({
      next: (response: any) => {
        this.departments = response.departments;
      }
    })
  }

  onSearchTeams() {
    this.attendanceService.getAllTeamsAttendanceData(this.searchForm.value).subscribe({
      next: (response: any) => {
        this.response = structuredClone(response);
        this.timesheet = response?.time_sheet || [];
      }
    });
  }

  onDownloadClick(){
    this.attendanceService.getAllTeamsAttendanceDownload(this.searchForm.value).subscribe({
      next: (response: any) => {
        const departmentName = this.departments.find(each => each.id === this.searchForm.value.department_id).department_name;
        this.filesService.downloadFile(response?.file, `${departmentName}-all-teams-${this.attendanceService.getFormattedMonthAndYear(this.searchForm.value.date)}`);
      }
    });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.searchForm.get('date').value!;
    ctrlValue.date(1);
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.searchForm.get('date').setValue(ctrlValue);
    datepicker.close();
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
       this.onSearchTeams();
      }
    });
  }
}
