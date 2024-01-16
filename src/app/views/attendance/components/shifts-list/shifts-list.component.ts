import { Component, OnInit, ViewChild } from '@angular/core';
import { ShiftsListService } from './shifts-list.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateShiftComponent } from '../add-update-shift/add-update-shift.component';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts-list.component.html',
  styleUrls: ['./shifts-list.component.scss'],
  animations: egretAnimations
})
export class ShiftsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  response: any;
  shiftsList: any;
  searchValue :any;
  displayedColumns = [
    'sNo',
    'name',
    'shiftStartTime',
    'shiftEndTime',
    'weekOffDay',
    'actions'

  ]
  constructor(
    private shiftsListService: ShiftsListService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getShiftsList();
  }

  getShiftsList() {
    this.shiftsListService.getShiftsList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.shiftsList = new MatTableDataSource(response.company_shifts);
      this.shiftsList.paginator = this.paginator;
    });
  }



  addShits() {
    const dialogRef = this.dialog.open(AddUpdateShiftComponent,
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
        this.getShiftsList();
      }
    });
  }

  updateShifts(rowData) {
    const dialogRef = this.dialog.open(AddUpdateShiftComponent,
      {
        width: '500px',
        data: {
          isEdit: true,
          defaultData: this.response,
          rowData
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getShiftsList();
      }
    });
  }

  convertTime(time) {
    if (!time) {
      return '';
    }
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[3] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
  }

  getWeekOffDays(day) {
    const days = day.split(',');
    return days.map(each => this.response.weekday_map[each]).join(', ');
  }

  onSearchValue() {
    this.shiftsListService.getShiftBySearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.shiftsList = new MatTableDataSource(response.company_shifts);
        this.shiftsList.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearSearchValue() {
    this.searchValue = '';
    this.getShiftsList();
  }
}
