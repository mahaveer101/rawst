import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeFormComponent } from './components/add-employee-form/add-employee-form.component';
import { TaxSavingListComponent } from './components/tax-saving-list/tax-saving-list.component';
import { AddTaxSavingFormComponent } from './components/add-tax-saving-form/add-tax-saving-form.component';
import { SalaryBreakupComponent } from './components/salary-breakup/salary-breakup.component';
import { AddSalaryBreakupFormComponent } from './components/add-salary-breakup-form/add-salary-breakup-form.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './accounts.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersPayrollComponent } from './components/users-payroll/users-payroll.component';
import { ViewEmployeeDetailsComponent } from './components/view-employee-details/view-employee-details.component';
import { ViewUsersPayrollDetailsComponent } from './components/view-users-payroll-details/view-users-payroll-details.component';
import { EditEmployeeFormComponent } from './components/edit-employee-form/edit-employee-form.component';
import { GradesListComponent } from './components/grades-list/grades-list.component';
import { ViewGradesListComponent } from './components/view-grades-list/view-grades-list.component';
import { ViewAssetsDetailsComponent } from './components/view-assets-details/view-assets-details.component';
import { AssetsListComponent } from './components/assets-list/assets-list.component';
import { ViewSalaryBreakupDetailsComponent } from './components/view-salary-breakup-details/view-salary-breakup-details.component';
import { TaxSavingApproveComponent } from './components/tax-saving-approve/tax-saving-approve.component';
import { EmployeeResetPasswordComponent } from './components/employee-reset-password/employee-reset-password.component';
import { Form16Component } from './components/form16/form16.component';
import { EditAssetsComponent } from './components/edit-assets/edit-assets.component';
import { AdvancedPaymentComponent } from './components/advanced-payment/advanced-payment.component';
import { AddAdvancePaymentComponent } from './components/add-advance-payment/add-advance-payment.component';
import { ViewAdvancedPaymentComponent } from './components/view-advanced-payment/view-advanced-payment.component';
import { AddBulkEmployeeComponent } from './components/add-bulk-employee/add-bulk-employee.component';
import { AddBulkSalaryBreakupComponent } from './components/add-bulk-salary-breakup/add-bulk-salary-breakup.component';
import { EditPayrollComponent } from './components/edit-payroll/edit-payroll.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { AddBulkLeavesComponent } from './components/add-bulk-leaves/add-bulk-leaves.component';
import { ViewEmployeeLeavesDetailsComponent } from './components/view-employee-leaves-details/view-employee-leaves-details.component';
import { AllTeamsPageComponent } from './components/all-teams-page/all-teams-page.component';
import { AllInOutLogsComponent } from './components/all-in-out-logs/all-in-out-logs.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { EditAttendanceComponent } from './components/edit-attendance/edit-attendance.component';
import { EditPfEsicComponent } from './components/edit-pf-esic/edit-pf-esic.component';
import { CalculationComponent } from './components/calculation/calculation.component';
import { ViewCalculationComponent } from './components/view-calculation/view-calculation.component';
import { PreviousTaxIncentiveComponent } from './components/previous-tax-incentive/previous-tax-incentive.component';
import { AddPreviousTaxComponent } from './components/add-previous-tax/add-previous-tax.component';
import { AddPreviousIncentivesComponent } from './components/add-previous-incentives/add-previous-incentives.component';
import { AddBulkPreviousTaxComponent } from './components/add-bulk-previous-tax/add-bulk-previous-tax.component';
import { AddBulkPreviousIncentiveComponent } from './components/add-bulk-previous-incentive/add-bulk-previous-incentive.component';
import { AddHouseRentComponent } from './components/add-house-rent/add-house-rent.component';
import { AddHouseRentDocumentComponent } from './components/add-house-rent-document/add-house-rent-document.component';
import { EditAttendancePComponent } from './components/edit-attendance-p/edit-attendance-p.component';
import { AllShiftComponent } from './components/all-shift/all-shift.component';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { EditOtHoursComponent } from './components/edit-ot-hours/edit-ot-hours.component';
@NgModule({
  declarations: [
    EmployeeListComponent,
    AddEmployeeFormComponent,
    TaxSavingListComponent,
    AddTaxSavingFormComponent,
    SalaryBreakupComponent,
    AddSalaryBreakupFormComponent,
    UsersPayrollComponent,
    ViewEmployeeDetailsComponent,
    ViewUsersPayrollDetailsComponent,
    EditEmployeeFormComponent,
    GradesListComponent,
    ViewGradesListComponent,
    AssetsListComponent,
    ViewAssetsDetailsComponent,
    ViewSalaryBreakupDetailsComponent,
    TaxSavingApproveComponent,
    EmployeeResetPasswordComponent,
    Form16Component,
    EditAssetsComponent,
    AdvancedPaymentComponent,
    AddAdvancePaymentComponent,
    ViewAdvancedPaymentComponent,
    AddBulkEmployeeComponent,
    AddBulkSalaryBreakupComponent,
    EditPayrollComponent,
    LeavesComponent,
    AddBulkLeavesComponent,
    ViewEmployeeLeavesDetailsComponent,
    AllTeamsPageComponent,
    AllInOutLogsComponent,
    AttendanceComponent,
    EditAttendanceComponent,
    EditPfEsicComponent,
    CalculationComponent,
    ViewCalculationComponent,
    PreviousTaxIncentiveComponent,
    AddPreviousTaxComponent,
    AddPreviousIncentivesComponent,
    AddBulkPreviousTaxComponent,
    AddBulkPreviousIncentiveComponent,
    AddHouseRentComponent,
    AddHouseRentDocumentComponent,
    EditAttendancePComponent,
    AllShiftComponent,
    ShiftListComponent,
    EditOtHoursComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  entryComponents: [
    AddEmployeeFormComponent,
    AddTaxSavingFormComponent, 
    AddSalaryBreakupFormComponent,
    ViewEmployeeDetailsComponent,
    ViewUsersPayrollDetailsComponent,
    EditEmployeeFormComponent,
    ViewAssetsDetailsComponent
  ]
})
export class AccountsModule { }
