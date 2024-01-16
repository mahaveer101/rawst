import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ViewPayslipComponent } from '../view-payslip/view-payslip.component';
import { ViewSalaryBreakupComponent } from '../view-salary-breakup/view-salary-breakup.component';
import { SalaryService } from './salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss'],
  animations: egretAnimations
})
export class SalaryComponent implements OnInit {
  salary: any;
  response: any;

  constructor(
    private salaryService: SalaryService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSalary();
  }

  getSalary() {
    this.salaryService.getSalary().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.salary = response?.salary_summary;
    });
  }

  viewPaySlip() {
    this.salaryService.getPayslipData().subscribe({
      next: (response: any) => {
        this.dialog.open(ViewPayslipComponent,
          {
            width: '800px',
            data: response || {}
          }
        );
      }
    });
  }

  viewSalaryBreakup() {
    this.salaryService.getSalaryBreakup().subscribe({
      next: (response: any) => {
        this.dialog.open(ViewSalaryBreakupComponent,
          {
            width: '600px',
            data: response || {}
          }
        );
      }
    });
  }
}

