import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AddEmployeeFormComponent } from '../add-employee-form/add-employee-form.component';
import { EditEmployeeFormComponent } from '../edit-employee-form/edit-employee-form.component';
import { ViewEmployeeDetailsComponent } from '../view-employee-details/view-employee-details.component';
import { EmployeeListService } from './employee-list.service';
import { EmployeeResetPasswordComponent } from '../employee-reset-password/employee-reset-password.component';
import { AddBulkEmployeeComponent } from '../add-bulk-employee/add-bulk-employee.component';
import { EditPfEsicComponent } from '../edit-pf-esic/edit-pf-esic.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations: egretAnimations
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  response: any;
  employeeList: any;
  searchValue = '';
  columns1 = [
    'emp_no',
    'name'
  ];

  columns2 = [
    'phone',
    'email',
    'designation_name',
  ];

  columns3 = [
    'attendance',
    'allowance',
    'ot',
    'metroCities',
    'actions'
  ];
  displayedColumns = [];
  constructor(
    private employeeListService: EmployeeListService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.updateDisplayedColumns();
    this.getEmployees();
  }

  getEmployees() {
    this.employeeListService.getEmployeeList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.employeeList = new MatTableDataSource(response.user_list);
      this.employeeList.paginator = this.paginator;
    });
  }

  addEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeFormComponent,
      {
        width: '500px',
        data: { defaultData: this.response }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getEmployees();
      }
    });
  }

  viewEmployeeDetails(id) {
    this.employeeListService.getEmployeeDetails(id).subscribe({
      next: (response: any) => {
        this.dialog.open(ViewEmployeeDetailsComponent,
          {
            width: '500px',
            data: response?.user || {}
          }
        );
      }
    });
  }

  updateEmployee(rowData) {
    const dialogRef = this.dialog.open(EditEmployeeFormComponent,
      {
        width: '500px',
        data: { defaultData: this.response, rowData }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getEmployees();
      }
    });
  }

  onSearchValue() {
    this.employeeListService.getEmployeesBySearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.employeeList = new MatTableDataSource(response.user_list);
        this.employeeList.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearSearchValue() {
    this.searchValue = '';
    this.getEmployees();
  }

  setAttendanceValue(user_id, event) {
    const check_attendance = event.checked ? '1' : '0';
    this.employeeListService.updateCheckAttendance(user_id, check_attendance).subscribe({
      next: () => {
        this.getEmployees();
      }
    });
  }

  setAttendanceAllowanceValue(user_id, event) {
    const attendance_allowance_status = event.checked ? '1' : '0';
    this.employeeListService.updateCheckAllowanceAttendance(user_id, attendance_allowance_status).subscribe({
      next: () => {
        this.getEmployees();
      }
    });
  }

  setOtStatus(user_id, event) {
    const ot_status = event.checked ? '1' : '0';
    this.employeeListService.updateOtStatus(user_id, ot_status).subscribe({
      next: () => {
        this.getEmployees();
      }
    });
  }

  setMetroCitiesStatus(user_id, event) {
    const is_metro_city = event.checked ? '1' : '0';
    this.employeeListService.updateMetroCityStatus(user_id, is_metro_city).subscribe({
      next: () => {
        this.getEmployees();
      }
    });
  }

  resetPassword(rowData) {
    const dialogRef = this.dialog.open(EmployeeResetPasswordComponent,
      {
        width: '500px',
        data: { rowData }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getEmployees();
      }
    });
  }

  addBulkEmployee(){
    const dialogRef = this.dialog.open(AddBulkEmployeeComponent,
      {
        width: '400px',
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getEmployees();
      }
    });
  }

  updatePFEsic(rowData){
    const dialogRef = this.dialog.open(EditPfEsicComponent,
      {
        width: '500px',
        data: { defaultData: this.response, rowData }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getEmployees();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateDisplayedColumns();
  }

  isMobile() {
    return window.screen.width <= 360;
  }

  updateDisplayedColumns() {
    if (this.isMobile()) {
      this.displayedColumns = [...this.columns1, ...this.columns3];
    } else {
      this.displayedColumns = [...this.columns1, ...this.columns2, ...this.columns3];
    }
  }
}
