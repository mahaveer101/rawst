import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AddDesignationFormComponent } from '../add-designation-form/add-designation-form.component';
import { DesignationListService } from './designation-list.service';
import { AddBulkDesignationComponent } from '../add-bulk-designation/add-bulk-designation.component';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.scss'],
  animations: egretAnimations
})
export class DesignationListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  response: any;
  designationList : any;
  departmentList = [];
  displayedColumns = [
    'id',
    'designation_name',
    'department_name',
    'check_attendance',
    'actions'
  ];

  constructor(
    private designationListService: DesignationListService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDesignationList();
  }

  getDesignationList() {
    this.designationListService.getDesignationList().subscribe((response: any) => {
      this.response = structuredClone(response);
      let designations = response?.designations || [];
      designations = designations.sort((a, b) => +a.id - +b.id);
      this.designationList = new MatTableDataSource(designations);
      this.departmentList = response.departments;
      this.designationList.paginator = this.paginator;
    });
  }

  addDesignation() {
    const dialogRef = this.dialog.open(AddDesignationFormComponent, 
      {
        width: '500px',
        data: {
          departments: this.departmentList || {},
          isAdd: true
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getDesignationList();
      }
    });
  }

  editDesignation(row) {
    const dialogRef = this.dialog.open(AddDesignationFormComponent, 
      {
        width: '500px',
        data: {
          departments: this.departmentList || {},
          isEdit: true,
          rowData: row
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getDesignationList();
      }
    });
  }
  addBulkDesignation(){
    const dialogRef = this.dialog.open(AddBulkDesignationComponent,
      {
        width: '400px',
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getDesignationList();
      }
    });
  }


}
