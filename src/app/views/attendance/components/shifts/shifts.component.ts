import { Component, OnInit, ViewChild } from '@angular/core';
import { ShiftsService } from './shifts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AddUpdateShiftsComponent } from '../add-update-shifts/add-update-shifts.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
  animations: egretAnimations
})
export class ShiftsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  response: any;
  userShiftsList: any;
  searchValue = '';
  displayedColumns = [
    'sNo',
    'empId',
    'employeeName',
    'shiftStartTime',
    'shiftEndTime',
    'shiftname',
    'actions'
  ]
  constructor(
    private shiftsService: ShiftsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserShiftsList();
  }
  getUserShiftsList() {
    this.shiftsService.getUserShiftsList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.userShiftsList = new MatTableDataSource(response.user_shift);
      this.userShiftsList.paginator = this.paginator;
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


  addUserShits(){
    const dialogRef = this.dialog.open(AddUpdateShiftsComponent,
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
        this.getUserShiftsList();
      }
    });
  }

  onSearchValue() {
    this.shiftsService.getUserShiftBySearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.userShiftsList = new MatTableDataSource(response.user_shift);
        this.userShiftsList.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearSearchValue() {
    this.searchValue = '';
    this.getUserShiftsList();
  }

  updateUserShifts(row){
    const dialogRef = this.dialog.open(AddUpdateShiftsComponent,
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
        this.getUserShiftsList();
      }
    });
  }

}
