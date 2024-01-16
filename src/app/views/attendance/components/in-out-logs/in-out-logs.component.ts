import { Component, OnInit } from '@angular/core';
import { InOutLogsService } from './in-out-logs.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-in-out-logs',
  templateUrl: './in-out-logs.component.html',
  styleUrls: ['./in-out-logs.component.scss']
})
export class InOutLogsComponent implements OnInit {
  myInOutList = [];
  myInOutResponse = null;
  selectDate = null;
  maxDate = new Date();
  displayedColumns = [
    'sNo',
    'attendence_date',
    'login_date_time',
    'logout_date_time',
    'break_time'
  ];
  constructor(
    private inOutLogsService: InOutLogsService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    
  }

  getMyInOut(selectDate) {
    this.myInOutList = [];
    this.inOutLogsService.getMyInOut(selectDate).subscribe((response: any) => {
      this.myInOutResponse = structuredClone(response);
      this.myInOutList = response?.in_out_data || [];
    });
  }

  onChangeSelectDate() {
    this.getMyInOut(this.selectDate);
  }

  convertDateAndTime (date) {
    if (!date) {
      return '';
    }
    const dateAndTime = date.split(' ');
    let time = dateAndTime[1];
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) {
      time = time.slice (1);
      time[3] = +time[0] < 12 ? ' AM' : ' PM'; 
      time[0] = +time[0] % 12 || 12;
    }
    return `${this.datepipe.transform(dateAndTime[0])} ` + time.join ('');
  }
}
