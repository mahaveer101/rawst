import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { LeavesService } from './leaves.service';
import { AddBulkLeavesComponent } from '../add-bulk-leaves/add-bulk-leaves.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewEmployeeLeavesDetailsComponent } from '../view-employee-leaves-details/view-employee-leaves-details.component';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
  animations: egretAnimations
})
export class LeavesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  response: any;
  leaveEmployeeList: any;
  searchValue = '';
  displayedColumns = [
    'sNo',
    'name',
    'email',
    'phone',
    'actions'
  ];
  constructor(
    private leavesService: LeavesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getLeavesList();
  }

  addBulkLeaves() {
    const dialogRef = this.dialog.open(AddBulkLeavesComponent,
      {
        width: '500px',
        data: { defaultData: this.response }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getLeavesList();
      }
    });
  }

  getLeavesList() {
    this.leavesService.getLeavesList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.leaveEmployeeList = new MatTableDataSource(response.user_leave_quota);
      this.leaveEmployeeList.paginator = this.paginator;
    });
  }

  viewEmployeeDetails(rowData) {
    this.dialog.open(ViewEmployeeLeavesDetailsComponent,
      {
        width: '500px',
        data: rowData
      }
    );
  }

  onSearchValue() {
    this.leavesService.getEmployeesBySearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.leaveEmployeeList = new MatTableDataSource(response.user_leave_quota);
        this.leaveEmployeeList.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearSearchValue() {
    this.searchValue = '';
    this.getLeavesList();
  }
}
