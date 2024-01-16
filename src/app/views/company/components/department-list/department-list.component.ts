import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AddDepartmentFormComponent } from '../add-department-form/add-department-form.component';
import { DepartmentListService } from './department-list.service';
import { AddBulkDepartmentComponent } from '../add-bulk-department/add-bulk-department.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  animations: egretAnimations
})
export class DepartmentListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  response: any;
  departmentList : any;
  
  displayedColumns = [
    'id',
    'department_name',
    'working_days',
    'break_time',
    'show_holiday_list',
    'actions'
  ];
  
  constructor(
    private departmentListService: DepartmentListService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
     this.getDepartmentList();
  }

  getDepartmentList() {
    this.departmentListService.getDepartmentList().subscribe((response: any) => {
      this.response = structuredClone(response);
      let departments = response?.departments || [];
      departments = response.departments.sort((a, b) => +a.id - +b.id);
      this.departmentList = new MatTableDataSource(departments);
      this.departmentList.paginator = this.paginator;
    });
  }

  addDepartment() {
    const dialogRef = this.dialog.open(AddDepartmentFormComponent, 
      {
        width: '500px',
        data: {
          isAdd: true
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getDepartmentList();
      }
    });
  }

  editDepartment(row) {
    const dialogRef = this.dialog.open(AddDepartmentFormComponent, 
      {
        width: '500px',
        data: {
          isEdit: true,
          rowData: row
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getDepartmentList();
      }
    });
  }

  addBulkDepartment(){
    const dialogRef = this.dialog.open(AddBulkDepartmentComponent,
      {
        width: '400px',
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getDepartmentList();
      }
    });
  }

}
