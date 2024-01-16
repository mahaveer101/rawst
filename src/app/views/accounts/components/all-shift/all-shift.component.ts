import { Component, OnInit, ViewChild } from '@angular/core';
import { AllShiftService } from './all-shift.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateShiftsComponent } from 'app/views/attendance/components/add-update-shifts/add-update-shifts.component';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-all-shift',
  templateUrl: './all-shift.component.html',
  styleUrls: ['./all-shift.component.scss'],
  animations: egretAnimations
})
export class AllShiftComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allShiftList: any;
  response: any;
  searchValue:'';
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
    private allShiftService: AllShiftService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllShift();
  }

  getAllShift() {
    this.allShiftService.getAllShift().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.allShiftList = new MatTableDataSource(response?.user_shift);
      this.allShiftList.paginator = this.paginator;
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


  addAllUserShits(){
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
        this.getAllShift();
      }
    });
  }

  onSearchValue() {
    this.allShiftService.getAllShiftBySearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.allShiftList = new MatTableDataSource(response.user_shift);
        this.allShiftList.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearSearchValue() {
    this.searchValue = '';
    this.getAllShift();
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
        this.getAllShift();
      }
    });
  }

}
