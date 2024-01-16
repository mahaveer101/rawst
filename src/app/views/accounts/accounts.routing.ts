import { Routes } from "@angular/router";
import { AssetsListComponent } from "./components/assets-list/assets-list.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { GradesListComponent } from "./components/grades-list/grades-list.component";
import { SalaryBreakupComponent } from "./components/salary-breakup/salary-breakup.component";
import { TaxSavingListComponent } from "./components/tax-saving-list/tax-saving-list.component";
import { UsersPayrollComponent } from "./components/users-payroll/users-payroll.component";
import { ViewGradesListComponent } from "./components/view-grades-list/view-grades-list.component";
import { Form16Component } from "./components/form16/form16.component";
import { AdvancedPaymentComponent } from "./components/advanced-payment/advanced-payment.component";
import { LeavesComponent } from "./components/leaves/leaves.component";
import { AllTeamsPageComponent } from "./components/all-teams-page/all-teams-page.component";
import { AllInOutLogsComponent } from "./components/all-in-out-logs/all-in-out-logs.component";
import { AttendanceComponent } from "./components/attendance/attendance.component";
import { CalculationComponent } from "./components/calculation/calculation.component";
import { PreviousTaxIncentiveComponent } from "./components/previous-tax-incentive/previous-tax-incentive.component";
import { AllShiftComponent } from "./components/all-shift/all-shift.component";
import { ShiftListComponent } from "./components/shift-list/shift-list.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'employee-list',
        pathMatch: 'full'
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
        data: { title: 'Employees', breadcrumb: 'Employees' }
      },
      {
        path: 'all-in-out',
        component: AllInOutLogsComponent,
        data: { title: 'In/Out', breadcrumb: 'In/Out' },
      },
      {
        path: 'assets-list',
        component: AssetsListComponent,
        data: { title: 'Assets', breadcrumb: 'Assets' }
      },
      {
        path: 'tax',
        component: TaxSavingListComponent,
        data: { title: 'Tax', breadcrumb: 'Tax' }
      },
      {
        path: 'form16',
        component: Form16Component,
        data: { title: 'Form-16', breadcrumb: 'Form-16' }
      },
      {
        path: 'salary-breakup',
        component: SalaryBreakupComponent,
        data: { title: 'Salary Breakup', breadcrumb: 'Salary Breakup' }
      },
      {
        path: 'advanced-payment',
        component: AdvancedPaymentComponent,
        data: { title: 'Advanced Payment', breadcrumb: 'Advanced Payment' }
      },
      {
        path: 'payroll',
        component: UsersPayrollComponent,
        data: { title: 'Payroll', breadcrumb: 'Payroll' }
      },
      {
        path: 'grades-list',
        component: GradesListComponent,
        data: { title: ' Perfomance', breadcrumb: 'Perfomance' },
      },
      {
        path: 'grades-view',
        component: ViewGradesListComponent,
        data: { title: ' Perfomance', breadcrumb: 'Perfomance' },
      },
      {
        path: 'leaves',
        component: LeavesComponent,
        data: { title: ' Leaves', breadcrumb: 'Leaves' },
      },
      {
        path: 'all-teams-page',
        component: AllTeamsPageComponent,
        data: { title: ' All Teams', breadcrumb: 'All Teams' },
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
        data: { title: ' Attendance', breadcrumb: 'Attendance' },
      },
      {
        path: 'calculation',
        component: CalculationComponent,
        data: { title: ' Calculation', breadcrumb: 'Calculation' },
      },
      {
        path: 'previous-tax-incentive',
        component: PreviousTaxIncentiveComponent,
        data: { title: 'Previous Tax And Incentive', breadcrumb: 'Previous Tax And Incentive' },
      },
      {
        path: 'shift-list',
        component: ShiftListComponent,
        data: { title: 'Assign-List', breadcrumb: 'Shift-List' },
      },
      {
        path: 'all-shift',
        component: AllShiftComponent,
        data: { title: 'Shift-Assign', breadcrumb: 'Shift-Assign' }
      },
    ]
  }
];