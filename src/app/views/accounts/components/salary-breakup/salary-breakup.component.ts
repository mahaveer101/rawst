import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AddSalaryBreakupFormComponent } from '../add-salary-breakup-form/add-salary-breakup-form.component';
import { SalaryBreakupService } from './salary-breakup.service';
import { ViewSalaryBreakupDetailsComponent } from '../view-salary-breakup-details/view-salary-breakup-details.component';
import { AddBulkSalaryBreakupComponent } from '../add-bulk-salary-breakup/add-bulk-salary-breakup.component';

@Component({
  selector: 'app-salary-breakup',
  templateUrl: './salary-breakup.component.html',
  styleUrls: ['./salary-breakup.component.scss'],
  animations: egretAnimations
})
export class SalaryBreakupComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  response: any;
  salaryBreakupList : any;
  searchValue = '';
  displayedColumns = [
    'user_id',
    'beneficiary_ac_no',
    'beneficiary_name',
    'bank_name',
    'actions'
  ];

  constructor(
      private salaryBreakupService: SalaryBreakupService,
      public dialog: MatDialog
  ) { }

  ngOnInit(): void {
     this.getSalaryBreakupList();
  }

  getSalaryBreakupList() {
    this.salaryBreakupService.getSalaryBreakupList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.salaryBreakupList = new MatTableDataSource(response.users_bank);
      this.salaryBreakupList.paginator = this.paginator;
    });
  }

  onSearchValue() {
    this.salaryBreakupService.getSalaryBreakupEmployeeBySearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.salaryBreakupList = new MatTableDataSource(response.users_bank);
        this.salaryBreakupList.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearSearchValue() {
    this.searchValue = '';
    this.getSalaryBreakupList();
  }

  addSalaryBreakup() {
    const dialogRef = this.dialog.open(AddSalaryBreakupFormComponent, 
      {
        width: '500px',
        data: this.response || {}
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getSalaryBreakupList();
      }
    });
  }

  viewSalaryBreakupDetails(id){
    this.salaryBreakupService.getSalaryBreakupDetails(id).subscribe({
      next: (response: any) => {
       this.dialog.open(ViewSalaryBreakupDetailsComponent, 
          {
            width: '500px',
            data: response?.user_bank || {}
          }
        );
      }
    });
  }

  addBulkSalaryBreakup(){
    const dialogRef = this.dialog.open(AddBulkSalaryBreakupComponent,
      {
        width: '400px',
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getSalaryBreakupList();
      }
    });
  }
 
}
