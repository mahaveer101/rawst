import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PreviousTaxIncentiveService } from './previous-tax-incentive.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddPreviousTaxComponent } from '../add-previous-tax/add-previous-tax.component';
import { AddPreviousIncentivesComponent } from '../add-previous-incentives/add-previous-incentives.component';
import { AddBulkPreviousTaxComponent } from '../add-bulk-previous-tax/add-bulk-previous-tax.component';
import { AddBulkPreviousIncentiveComponent } from '../add-bulk-previous-incentive/add-bulk-previous-incentive.component';

@Component({
  selector: 'app-previous-tax-incentive',
  templateUrl: './previous-tax-incentive.component.html',
  styleUrls: ['./previous-tax-incentive.component.scss']
})
export class PreviousTaxIncentiveComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  response: any;
  previousTaxIncentiveList: any = new MatTableDataSource([]);
  searchValue = '';
  displayedColumns = [
    'emp_no',
    'name',
    'phone',
    'email',
    'actions'
  ];
  constructor(
    private previousTaxIncentiveService: PreviousTaxIncentiveService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getEmployeePreviousTaxAndIncentive();
  }

  getEmployeePreviousTaxAndIncentive() {
    this.previousTaxIncentiveService.getEmployeePreviousTaxAndIncentive().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.previousTaxIncentiveList = new MatTableDataSource(response.user_list);
      this.previousTaxIncentiveList.paginator = this.paginator;
    });
  }

  onSearchValue() {
    this.previousTaxIncentiveService.getEmployeesBySearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.previousTaxIncentiveList = new MatTableDataSource(response.user_list);
        this.previousTaxIncentiveList.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearSearchValue() {
    this.searchValue = '';
    this.getEmployeePreviousTaxAndIncentive();
  }

  addPreviousTax(id) {
    this.previousTaxIncentiveService.getSavedTaxIncentive(id).subscribe(response => {
      const dialogRef = this.dialog.open(AddPreviousTaxComponent,
        {
          width: '500px',
          data: {
            user_id: id,
            savedResponse: response
          }
        }
      );
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.getEmployeePreviousTaxAndIncentive();
        }
      });
    })
  }

  addPreviousIncentives(id) {
    this.previousTaxIncentiveService.getSavedTaxIncentive(id).subscribe(response => {
      const dialogRef = this.dialog.open(AddPreviousIncentivesComponent,
        {
          width: '500px',
          data: {
            user_id: id,
            savedResponse: response
          }
        }
      );
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.getEmployeePreviousTaxAndIncentive();
        }
      });
    });
  }

  addBulkPreviousTax(){
    const dialogRef = this.dialog.open(AddBulkPreviousTaxComponent,
      {
        width: '400px',
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getEmployeePreviousTaxAndIncentive();
      }
    });
  }

  addBulkPreviousIncentive(){
    const dialogRef = this.dialog.open(AddBulkPreviousIncentiveComponent,
      {
        width: '400px',
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getEmployeePreviousTaxAndIncentive();
      }
    });
  }
}
