import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './components/company/company.component';
import { DesignationListComponent } from './components/designation-list/designation-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { AddDepartmentFormComponent } from './components/add-department-form/add-department-form.component';
import { AddDesignationFormComponent } from './components/add-designation-form/add-designation-form.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './company.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddHolidayFormComponent } from './components/add-holiday-form/add-holiday-form.component';
import { EditPayrollComponent } from './components/edit-payroll/edit-payroll.component';
import { EditWorkingHoursComponent } from './components/edit-working-hours/edit-working-hours.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { EditCompanyLeaveTypeComponent } from './components/edit-company-leave-type/edit-company-leave-type.component';
import { EditGradeComponent } from './components/edit-grade/edit-grade.component';
import { EditCompanyTaxComponent } from './components/edit-company-tax/edit-company-tax.component';
import { EditComapanyLogoComponent } from './components/edit-comapany-logo/edit-comapany-logo.component';
import { AddBulkDepartmentComponent } from './components/add-bulk-department/add-bulk-department.component';
import { AddBulkDesignationComponent } from './components/add-bulk-designation/add-bulk-designation.component';
import { NoticeBoardAnnouncementComponent } from './components/notice-board-announcement/notice-board-announcement.component';
import { AddUpdateannouncementsComponent } from './components/add-updateannouncements/add-updateannouncements.component';

@NgModule({
  declarations: [
    CompanyComponent,
    DepartmentListComponent,
    DesignationListComponent,
    AddDepartmentFormComponent,
    AddDesignationFormComponent,
    AddHolidayFormComponent,
    EditPayrollComponent,
    EditWorkingHoursComponent,
    EditCompanyComponent,
    EditCompanyLeaveTypeComponent,
    EditGradeComponent,
    EditCompanyTaxComponent,
    EditComapanyLogoComponent,
    AddBulkDepartmentComponent,
    AddBulkDesignationComponent,
    NoticeBoardAnnouncementComponent,
    AddUpdateannouncementsComponent,
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
    AddDepartmentFormComponent,
    AddDesignationFormComponent,
    AddHolidayFormComponent,
    EditPayrollComponent,
    EditWorkingHoursComponent,
    EditCompanyComponent,
    EditCompanyLeaveTypeComponent,
    EditGradeComponent
  ]
})
export class CompanyModule { }
