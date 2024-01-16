import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { EmployeeListService } from 'app/views/accounts/components/employee-list/employee-list.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: egretAnimations
})
export class EmployeesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  response: any;
  employeeList: any;
  searchValue = '';
  displayedColumns = [
    'name',
    'email',
    'phone',
    'department_name',
  ];

  constructor(
    private employeeListService: EmployeeListService,
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeListService.getEmployeeList().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.employeeList = new MatTableDataSource(response.user_list);
      this.employeeList.paginator = this.paginator;
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
}
