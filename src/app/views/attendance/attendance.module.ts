import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceRoutes } from './attendance.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { LeavesComponent } from './components/leaves/leaves.component';
import { LeaveApplicationFormComponent } from './components/leave-application-form/leave-application-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RegularizationComponent } from './components/regularization/regularization.component';
import { WFHComponent } from './components/wfh/wfh.component';
import { HybridWorkFromHomeComponent } from './components/hybrid-work-from-home/hybrid-work-from-home.component';
import { OfficeWorkTimeComponent } from './components/office-work-time/office-work-time.component';
import { CompOffComponent } from './components/comp-off/comp-off.component';
import { ForceChangePasswordComponent } from './components/force-change-password/force-change-password.component';
import { AddBulkTimesheetComponent } from './components/add-bulk-timesheet/add-bulk-timesheet.component';
import { InOutLogsComponent } from './components/in-out-logs/in-out-logs.component';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { AddUpdateShiftsComponent } from './components/add-update-shifts/add-update-shifts.component';
import { ShiftsListComponent } from './components/shifts-list/shifts-list.component'
import { AddUpdateShiftComponent } from './components/add-update-shift/add-update-shift.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LeavesComponent,
    LeaveApplicationFormComponent,
    TimesheetComponent,
    RegularizationComponent,
    WFHComponent,
    HybridWorkFromHomeComponent,
    OfficeWorkTimeComponent,
    CompOffComponent,
    ForceChangePasswordComponent,
    AddBulkTimesheetComponent,
    InOutLogsComponent,
    ShiftsComponent,
    AddUpdateShiftsComponent,
    ShiftsListComponent,
    AddUpdateShiftComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AttendanceRoutes),
    FlexLayoutModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  entryComponents: [
    LeaveApplicationFormComponent
  ]
})
export class AttendanceModule { }
