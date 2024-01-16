import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ViewUsersPayrollDetailsComponent } from '../view-users-payroll-details/view-users-payroll-details.component';
import { UsersPayrollService } from './users-payroll.service';
import { FilesService } from 'app/shared/services/files/files.service';
import { EditPayrollComponent } from '../edit-payroll/edit-payroll.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment} from 'moment';
import { FormControl } from '@angular/forms';

const moment = _moment;

const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM',
  },
  display: {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM',
  },
};

@Component({
  selector: 'app-users-payroll',
  templateUrl: './users-payroll.component.html',
  styleUrls: ['./users-payroll.component.scss'],
  animations: egretAnimations,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UsersPayrollComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  response: any;
  usersPayrollList: any;
  errorMessage= '';
  monthAndYearToCalculateSalary = new FormControl(moment());
  monthAndYearToDownloadPayroll = new FormControl(moment());
  monthAndYearToDownloadBankTransfor = new FormControl(moment());
  monthAndYearForListView = new FormControl(moment());
  displayedColumns = [
    'name',
    'payroll_year',
    'payroll_month',
    'paid_days',
    'absent',
    'final_paid_days',
    'net_paid',
    'actions'
  ];

  constructor(
    private usersPayrollService: UsersPayrollService,
    public dialog: MatDialog,
    private filesService: FilesService
  ) { }

  ngOnInit(): void {
     this.getUsersPayrollList();
  }

  getUsersPayrollList() {
    const year = moment(this.monthAndYearForListView.value).format('YYYY');
    const month = moment(this.monthAndYearForListView.value).format('MM');
    this.usersPayrollService.getUsersPayroll(month, year).subscribe((response: any) => {
      this.response = structuredClone(response);
      this.usersPayrollList = new MatTableDataSource(response.users_payrolls || []);
      this.usersPayrollList.paginator = this.paginator;
    });
  }
  
  viewUsersPayrollDetails(id){
    this.usersPayrollService.getUsersPayrollDeatils(id).subscribe({
      next: (response: any) => {
       this.dialog.open(ViewUsersPayrollDetailsComponent, 
          {
            width: '500px',
            data: response?.user_payroll || {}
          }
        );
      }
    });
  }

  openCalcualeSalaryPopup(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'submit') {
        this.calculateSalary();
      }
    });
  }

  calculateSalary(){
    const date = moment(this.monthAndYearToCalculateSalary.value).format('YYYY-MM');
    this.usersPayrollService.submitOnCalculateSalary(date).subscribe({
      next: (response:any) => {
        console.log("successfull", response);
      }
    });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.monthAndYearToCalculateSalary.value;
    ctrlValue.year(normalizedMonthAndYear.year());
    ctrlValue.month(normalizedMonthAndYear.month());
    this.monthAndYearToCalculateSalary.setValue(ctrlValue);
    datepicker.close();
  }

  setMonthAndYearForListView(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.monthAndYearForListView.value;
    ctrlValue.year(normalizedMonthAndYear.year());
    ctrlValue.month(normalizedMonthAndYear.month());
    this.monthAndYearForListView.setValue(ctrlValue);
    datepicker.close();
    this.getUsersPayrollList();
  }

  
  openDownloadPayrollDownload(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'submit') {
        this.downloadPayrollDownload();
      }
    });
  }
  

  downloadPayrollDownload() {
    this.errorMessage='';
    const date = moment(this.monthAndYearToDownloadPayroll.value).format('YYYY-MM');
    this.usersPayrollService.getPayrollDownloadData(date).subscribe({
      next: (response: any) => {
        if (response.file) {
          this.filesService.downloadFile(response?.file, `Payroll_download`);
        }
        else {
          this.errorMessage = 'Payroll Download is not available';
        }
      }
    })
  }

  setMonthAndYearDownload(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.monthAndYearToDownloadPayroll.value;
    ctrlValue.year(normalizedMonthAndYear.year());
    ctrlValue.month(normalizedMonthAndYear.month());
    this.monthAndYearToDownloadPayroll.setValue(ctrlValue);
    datepicker.close();
  }


  openDownloadBanktransforDownload(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'submit') {
        this.downloadBanktransforDownload();
      }
    });
  }

  setMonthAndYearDownloadBankTranfor(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.monthAndYearToDownloadBankTransfor.value;
    ctrlValue.year(normalizedMonthAndYear.year());
    ctrlValue.month(normalizedMonthAndYear.month());
    this.monthAndYearToDownloadBankTransfor.setValue(ctrlValue);
    datepicker.close();
  }

  downloadBanktransforDownload(){
    this.errorMessage='';
    const date = moment(this.monthAndYearToDownloadBankTransfor.value).format('YYYY-MM');
    this.usersPayrollService.getPayrollBankTranferDownloadData(date).subscribe({
      next: (response: any) => {
        if (response.file) {
          this.filesService.downloadFile(response?.file, `Bank_transfer_download`);
        }
        else {
          this.errorMessage = 'Bank Transfer Download is not available';
        }
      }
    })
  }

  editPayroll(rowData){
    const dialogRef = this.dialog.open(EditPayrollComponent,
      {
        width: '500px',
        data: {
          payrollDetails: rowData
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getUsersPayrollList();
      }
    });
  }

}
