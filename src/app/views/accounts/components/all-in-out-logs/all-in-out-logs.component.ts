import { Component, OnInit } from '@angular/core';
import { AllInOutLogsService } from './all-in-out-logs.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-in-out-logs',
  templateUrl: './all-in-out-logs.component.html',
  styleUrls: ['./all-in-out-logs.component.scss']
})
export class AllInOutLogsComponent implements OnInit {
  allInOutList = new MatTableDataSource<any>([]);
  allInOutResponse = null;
  allInOutDate = null;
  allInOutDepartment = '';
  maxDate = new Date();
  departments = [];
  displayedColumns = [
    'attendence_date',
    'login_date_time',
    'logout_date_time',
    'break_time'
  ];

  constructor(
    private allInOutLogsService: AllInOutLogsService,
    private datepipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.allInOutLogsService.getAllUsers().subscribe((response: any) => {
      this.departments = response?.departments || [];
    });
  }

  onSearchAllInOut() {
    this.allInOutList.data = [];
    this.allInOutLogsService.getAllInOut(this.allInOutDate, this.allInOutDepartment).subscribe((response: any) => {
      this.allInOutResponse = structuredClone(response);
      this.allInOutList = new MatTableDataSource(this.prepareInOutDataWithRowGrouping(response?.in_out_data || {}));
    });
  }

  allInOutDataWithEmployeeId(inOutData) {
    const inOutList = [];
    for(let employeeId in inOutData) {
      for (let each of inOutData[employeeId]) {
        each.employeeId = employeeId;
        inOutList.push(each);
      }
    }
    return inOutList;
  }
  
  prepareInOutDataWithRowGrouping(inOutData) {
    let rows = [];
    for (let eachId in inOutData) {
      rows.push({
        text: eachId,
        isGroup: true,
        count: inOutData[eachId].length
      });
      rows.push(...inOutData[eachId]);
    }
    return rows;
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

  isGroup(index, item): boolean {
    return item.isGroup;
  }
}
