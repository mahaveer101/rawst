import { Component, OnInit } from '@angular/core';
import { AllTeamsPageService } from './all-teams-page.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilesService } from 'app/shared/services/files/files.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { ViewEmployeesComponent } from 'app/views/profile/components/view-employees/view-employees.component';
import { MatDialog } from '@angular/material/dialog';
import { EditAttendanceComponent } from '../edit-attendance/edit-attendance.component';
import { EditAttendancePComponent } from '../edit-attendance-p/edit-attendance-p.component';
import { EditOtHoursComponent } from '../edit-ot-hours/edit-ot-hours.component';

@Component({
  selector: 'app-all-teams-page',
  templateUrl: './all-teams-page.component.html',
  styleUrls: ['./all-teams-page.component.scss']
})
export class AllTeamsPageComponent implements OnInit {
  departments = [];
  searchAttendanceForm: FormGroup = new FormGroup({
    start_date: new FormControl(null, [ Validators.required ]),
    end_date: new FormControl(null, [ Validators.required ]),
    department_id: new FormControl('', [ Validators.required ])
  });

  serachOtHoursForm: FormGroup = new FormGroup({
    start_date: new FormControl(null, [ Validators.required ]),
    end_date: new FormControl(null, [ Validators.required ]),
    department_id: new FormControl('', [ Validators.required ])
  })

  searchForm: FormGroup = new FormGroup({
    date: new FormControl(null, [ Validators.required ]),
    department_id: new FormControl('', [ Validators.required ])
  });

  attendanceDate = new Date();
  response: any;
  timesheet: any;
  otHoursResponse: any;
  otHours: any;
  otHoursAttendanceDate = new Date();

  constructor(
    private allTeamsService: AllTeamsPageService,
    private filesService: FilesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.allTeamsService.getDepartmentList().subscribe({
      next: (response: any) => {
        this.departments = response.departments;
      }
    })
  }

  onSearchTeams() {
    this.allTeamsService.getAllTeamsData(this.searchForm.value).subscribe({
      next: (response: any) => {
        this.response = structuredClone(response);
      }
    });
  }

  onSearchAttendanceTeams() {
    this.allTeamsService.getAllTeamsAttendanceData(this.searchAttendanceForm.value).subscribe({
      next: (response: any) => {
        this.response = structuredClone(response);
        this.timesheet = response?.time_sheet || [];
        this.attendanceDate = response?.time_sheet[0]?.time_sheet[0]?.attendence_date;
      }
    });
  }

  onDownloadClick(){
    this.allTeamsService.getAllTeamsPageDownload(this.searchForm.value).subscribe({
      next: (response: any) => {
        const departmentName = this.departments.find(each => each.id === this.searchForm.value.department_id).department_name;
        this.filesService.downloadFile(response?.file, `${departmentName}-all-teams-${getFormattedDate(this.searchForm.value.date)}`);
      }
    });
  }

  onDownloadAttendanceClick(){
    this.allTeamsService.getAllAttendanceTeamsPageDownload(this.searchAttendanceForm.value).subscribe({
      next: (response: any) => {
        const departmentName = this.departments.find(each => each.id === this.searchAttendanceForm.value.department_id).department_name;
        this.filesService.downloadFile(response?.file, `${departmentName}-all-teams-${getFormattedDate(this.searchAttendanceForm.value.date)}`);
      }
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
        
      }
    });
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
        this.onSearchAttendanceTeams();
      }
    });
  }

  updateAttendanceP(user, day) {
    const dialogRef = this.dialog.open(EditAttendancePComponent,
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
        this.onSearchAttendanceTeams();
      }
    });
  }
  onSearchOtHours(){
    this.allTeamsService.getAllTeamsOtHours(this.serachOtHoursForm.value).subscribe({
      next: (otHoursResponse: any) => {
        this.otHoursResponse = structuredClone(otHoursResponse);
        this.otHours = otHoursResponse?.ot_hours || [];
        this.otHoursAttendanceDate = otHoursResponse?.ot_hours[0]?.ot_hours[0]?.attendence_date;
      }
    });
  }

  updateOtHours(user, day){
    const dialogRef = this.dialog.open(EditOtHoursComponent,
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
        this.onSearchOtHours();
      }
    });
  }

}
