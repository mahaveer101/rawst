import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CalculationService } from './calculation.service';
import { ViewCalculationComponent } from '../view-calculation/view-calculation.component';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  response: any;
  employeeCalculationList: any;
  searchValue = '';
  displayedColumns = [
    'emp_no',
    'name',
    'phone',
    'email',
    'actions'
  ];
  constructor(
    private calculationService: CalculationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getEmployeeCalculation();
  }

  getEmployeeCalculation() {
    this.calculationService.getEmployeeCalculation().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.employeeCalculationList = new MatTableDataSource(response.user_list);
      this.employeeCalculationList.paginator = this.paginator;
    });
  }

  
  viewCalculate(id) {
    this.calculationService.getUserTaxDetails(id).subscribe({
      next: (response: any) => {
        this.dialog.open(ViewCalculationComponent,
          {
            width: '600px',
            data: response || {}
          }
        );
      }
    });
  }

  calculateTax(){
    this.calculationService.submitCalculationTax().subscribe({
      next:(response: any)=> {
        this.getEmployeeCalculation();
      }
    })
  }
  taxCalculation(id){
    this.calculationService.submitUserCalculationTax(id).subscribe({
      next:(response: any)=> {
        this.getEmployeeCalculation();
      }
    })
  }

  onSearchValue() {
    this.calculationService.getEmployeesBySearch(this.searchValue).subscribe({
      next: (response: any) => {
        this.employeeCalculationList = new MatTableDataSource(response.user_list);
        this.employeeCalculationList.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearSearchValue() {
    this.searchValue = '';
    this.getEmployeeCalculation();
  }
}
