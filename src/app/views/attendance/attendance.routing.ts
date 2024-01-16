import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LeavesComponent } from "./components/leaves/leaves.component";
import { RegularizationComponent } from './components/regularization/regularization.component';
import { TimesheetComponent } from "./components/timesheet/timesheet.component";
import { WFHComponent } from "./components/wfh/wfh.component";
import { HybridWorkFromHomeComponent } from "./components/hybrid-work-from-home/hybrid-work-from-home.component";
import { OfficeWorkTimeComponent } from "./components/office-work-time/office-work-time.component";
import { CompOffComponent } from "./components/comp-off/comp-off.component";
import { InOutLogsComponent } from "./components/in-out-logs/in-out-logs.component";
import { ShiftsComponent } from "./components/shifts/shifts.component";
import { ShiftsListComponent } from "./components/shifts-list/shifts-list.component";

export const AttendanceRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
      },
      {
        path: 'leaves',
        component: LeavesComponent,
        data: { title: 'Leaves', breadcrumb: 'Leaves' }
      },
      {
        path: 'regularization',
        component: RegularizationComponent,
        data: { title: 'Regularization', breadcrumb: 'Regularization' }
      },
      {
        path: 'timesheet',
        component: TimesheetComponent,
        data: { title: 'Timesheet', breadcrumb: 'Timesheet' }
      },
      {
        path: 'wfh',
        component: WFHComponent,
        data: { title: 'Daily Approval', breadcrumb: 'Work From Home' }
      },
      {
        path: 'hybrid-work-from-home',
        component: HybridWorkFromHomeComponent,
        data: { title: ' Hybride ', breadcrumb: 'Hybrid Work From Home' }
      },
      {
        path: 'office-work-time',
        component: OfficeWorkTimeComponent,
        data: { title: 'Roaster', breadcrumb: 'Office Work Time' }
      },
      {
        path: 'shifts-assign',
        component: ShiftsComponent,
        data: { title: 'Assign', breadcrumb: 'Shift Assign' },
      },
      {
        path: 'shifts-list',
        component: ShiftsListComponent,
        data: { title: 'List', breadcrumb: 'Shift List' }
      },
      {
        path: 'comp-off',
        component: CompOffComponent,
        data: { title: 'Comp-Off', breadcrumb: ' Add Comp Off' }
      },
      {
        path: 'in-out',
        component: InOutLogsComponent,
        data: { title: ' In/Out', breadcrumb: 'In/Out' }
      }
    ]
  }
];


