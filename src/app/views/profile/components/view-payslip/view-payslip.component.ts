import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { FilesService } from 'app/shared/services/files/files.service';
import * as moment from 'moment';
import { SalaryService } from '../salary/salary.service';

@Component({
  selector: 'app-view-payslip',
  templateUrl: './view-payslip.component.html',
  styleUrls: ['./view-payslip.component.scss'],
  animations: egretAnimations
})
export class ViewPayslipComponent implements OnInit {
  payslipData: any;
  payslipDate = new Date();
  selectedMonth = '';

  constructor(
    public dialogRef: MatDialogRef<ViewPayslipComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private salaryService: SalaryService,
    private filesService: FilesService
  ) {
  }

  ngOnInit(): void {
    this.payslipData = this.data;
    this.payslipDate = new Date();
    this.payslipDate.setFullYear(+this.payslipData?.payslip_history[0]?.payroll_year, +this.payslipData?.payslip_history[0]?.payroll_month - 1, 2);
  }

  downloadPayslip() {
    const month = moment(this.payslipDate).format('MM').replace(/^0+/, '');
    const year = moment(this.payslipDate).format('yyyy');
    this.salaryService.getPayslipDownloadData(month, year).subscribe({
      next: (response: any) => {
        this.filesService.downloadFile(response?.download_path, `payslip_${month}_${year}`);
      }
    })
  }

  public toFloat(value: string): number {
    return parseFloat(value.replace(/,/g, ''));
  }

  onChangeMonth(event) {
    const monthObj = this.payslipData?.payslip_history.find(each => each.id === event.value);
    this.payslipDate = new Date();
    this.payslipDate.setFullYear(monthObj.payroll_year, parseFloat(monthObj.payroll_month) - 1, 2);
    const month = moment(this.payslipDate).format('MM');
    const year = moment(this.payslipDate).format('yyyy');
    this.salaryService.getPayslipDataForMonth(`${year}-${month}`).subscribe({
      next: (response: any) => {
        this.payslipData = response;
      }
    });
  }
}