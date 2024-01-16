import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { EgretCalendarEvent } from 'app/shared/models/event.model';
import { Subject } from 'rxjs';
import { TimesheetService } from './timesheet.service';
import * as moment from 'moment';
import { AddBulkTimesheetComponent } from '../add-bulk-timesheet/add-bulk-timesheet.component';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  animations: egretAnimations,
})
export class TimesheetComponent implements OnInit {
  public view = 'month';
  public viewDate = new Date();
  public activeDayIsOpen: boolean = false;
  public refresh: Subject<any> = new Subject();
  public events: EgretCalendarEvent[] = [];
  userDetails: any;

  constructor(
    public dialog: MatDialog,
    private timesheetService: TimesheetService,
    private jwtAuth: JwtAuthService
  ) {
  }

  ngOnInit() {
    this.userDetails = this.jwtAuth.user;
    this.loadAttendance();
  }

  private initEvents(events): EgretCalendarEvent[] {
    return events.map((event) => {
      return new EgretCalendarEvent(event);
    });
  }

  public loadAttendance() {
    this.timesheetService.getTimesheet().subscribe((events: CalendarEvent[]) => {
      this.events = this.initEvents(events);
    });
  }

  public goToNextOrPreviousMonth() {
    const currentMonth = moment(this.viewDate).format('yyyy-MM');
    this.timesheetService.getTimesheetByMonth(currentMonth).subscribe((events: CalendarEvent[]) => {
      this.events = this.initEvents(events);
    });
  }

  addBulkTimesheet() {
    const dialogRef = this.dialog.open(AddBulkTimesheetComponent,
      {
        width: '400px',
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadAttendance();
      }
    });
  }

  getHoursAndMinutes(time) {
    let timearray = time.split(':');
    timearray.pop();
    return timearray.join(':');
  }
}

