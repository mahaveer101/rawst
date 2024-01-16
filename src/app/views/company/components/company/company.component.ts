import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AddHolidayFormComponent } from '../add-holiday-form/add-holiday-form.component';
import { EditCompanyLeaveTypeComponent } from '../edit-company-leave-type/edit-company-leave-type.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';
import { EditGradeComponent } from '../edit-grade/edit-grade.component';
import { EditPayrollComponent } from '../edit-payroll/edit-payroll.component';
import { EditWorkingHoursComponent } from '../edit-working-hours/edit-working-hours.component';
import { CompanyService } from './company.service';
import { EditCompanyTaxComponent } from '../edit-company-tax/edit-company-tax.component';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { EditComapanyLogoComponent } from '../edit-comapany-logo/edit-comapany-logo.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  animations: egretAnimations
})
export class CompanyComponent implements OnInit {

  response: any;
  companyDetails: any = {};
  companyHolidayCalender = new MatTableDataSource([]);
  companyGrade = new MatTableDataSource([]);
  companyLeaves = new MatTableDataSource([]);
  companyWorkingHoursSettings = new MatTableDataSource([]);
  payrollSettings: any = {};
  taxSettings: any = {};

  displayedCompanyColumns = [
    'company_name',
    'contact_number',
    'email',
    'city'
  ];

  displayedHolidayColumns = [
    'year_period',
    'holiday_name',
    'holiday_date',
    'actions'
  ];

  displayedGradeColumn =[
    'name',
    'percentage'
  ];
  displayedLeaveColumn = [
    'name',
    'quota'
  ];

  displayedSessionTypeColumn = [
    'name'
  ];

  displayedWorkingHoursSettings = [
    'name',
    'value'
  ];

  displayedTaxSettingsColumn = [
    'start',
    'end',
    'percentage',
    'flat'
  ];

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog,
    public jwtAuth: JwtAuthService
  ) {  }

  ngOnInit(): void {
    this.getCompanyDetails();
  }

  getCompanyDetails() {
    this.companyService.getCompany().subscribe((response: any) => {
      this.response = structuredClone(response);
      this.companyDetails = response.company || {};
      this.companyHolidayCalender = new MatTableDataSource(response.company_holiday_calender);
      this.companyGrade = new MatTableDataSource(response.company_general_settings?.grade_settings?.grade || [] );
      this.companyLeaves = new MatTableDataSource(response.company_general_settings?.leave_settings?.leave_type || [] );
      this.companyWorkingHoursSettings= new MatTableDataSource(response.company_general_settings?.working_hours_settings?.hours || []);
      this.payrollSettings = response?.company_general_settings?.payroll_settings || {};
      this.taxSettings = response?.company_general_settings?.tax_settings || {};
      this.jwtAuth.setCompanyName(this.companyDetails?.company_name || '', true);
      this.jwtAuth.setCompanyLogo(this.companyDetails?.logo || '', true);
    });
  }

  addOrUpdateHoliday(action, rowData?) {
    const dialogRef = this.dialog.open(AddHolidayFormComponent, 
      {
        width: '500px',
        data: {
          companyId: this.companyDetails.id,
          action,
          rowData
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getCompanyDetails();
      }
    });
  }

  editPayroll() {
    const dialogRef = this.dialog.open(EditPayrollComponent, 
      {
        width: '500px',
        data: {
          payrollSettings: this.payrollSettings
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getCompanyDetails();
      }
    });
  }

  editWorkingHours() {
    const dialogRef = this.dialog.open(EditWorkingHoursComponent, 
      {
        width: '500px',
        data: {
          hours: this.companyWorkingHoursSettings.data
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getCompanyDetails();
      }
    });
  }

  editCompany() {
    const dialogRef = this.dialog.open(EditCompanyComponent, 
      {
        width: '500px',
        data: {
          company: this.companyDetails
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getCompanyDetails();
      }
    });
  }

  editGradeTypes() {
    const dialogRef = this.dialog.open(EditGradeComponent, 
      {
        width: '500px',
        data: {
          companyGrade: this.companyGrade.data || []
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getCompanyDetails();
      }
    });
  }

  editLeaveTypes() {
    const dialogRef = this.dialog.open(EditCompanyLeaveTypeComponent, 
      {
        width: '500px',
        data: {
          companyLeaves: this.companyLeaves.data || []
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getCompanyDetails();
      }
    });
  }

  editCompanyTax() {
    const dialogRef = this.dialog.open(EditCompanyTaxComponent, 
      {
        width: '500px',
        data: {
          companyTax: this.taxSettings || {}
        }
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getCompanyDetails();
      }
    });
  }

  getDateSuffix(date) {
    date = parseFloat(date);
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  public toFloat(value: string): number {
    if (!value) {
      return 0;
    }
    return parseFloat(value.replace(/,/g, ''));
 }

 editCompanyLogo(){
  const dialogRef = this.dialog.open(EditComapanyLogoComponent,
    {
      width: '500px'
    });
  dialogRef.afterClosed().subscribe((res) => {
    if (res) {
      this.getCompanyDetails();
    }
  });
 }

 deleteConfirmation(templateRef: TemplateRef<any>) {
  const dialogRef = this.dialog.open(templateRef);
  dialogRef.afterClosed().subscribe((res) => {
    if (res === 'yes') {
      this.companyService.deleteCompanyLogo().subscribe(res => {
        this.getCompanyDetails();
      });
    }
  });
}
}

