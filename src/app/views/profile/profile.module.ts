import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { routes } from './profile.routing';
import { TeamComponent } from './components/team/team.component';
import { MyAssetsComponent } from './components/my-assets/my-assets.component';
import { ViewEmployeesComponent } from './components/view-employees/view-employees.component';
import { SalaryComponent } from './components/salary/salary.component';
import { ViewPayslipComponent } from './components/view-payslip/view-payslip.component';
import { ViewSalaryBreakupComponent } from './components/view-salary-breakup/view-salary-breakup.component';
import { TaxComponent } from './components/tax/tax.component';
import { AddTaxSavingComponent } from './components/add-tax-saving/add-tax-saving.component';
import { EditTaxDeclarationFormComponent } from './components/edit-tax-declaration-form/edit-tax-declaration-form.component';
import { AddHouseRentComponent } from './components/add-house-rent/add-house-rent.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { EditUserAddressComponent } from './components/edit-user-address/edit-user-address.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { UpdatProfileImageComponent } from './components/updat-profile-image/updat-profile-image.component';
@NgModule({
  declarations: [
    TeamComponent,
    MyAssetsComponent,
    ViewEmployeesComponent,
    SalaryComponent,
    ViewPayslipComponent,
    ViewSalaryBreakupComponent,
    TaxComponent,
    AddTaxSavingComponent,
    EditTaxDeclarationFormComponent,
    AddHouseRentComponent,
    UserProfileComponent,
    EditUserProfileComponent,
    EditUserAddressComponent,
    EmployeesComponent,
    UpdatProfileImageComponent,
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
    AddTaxSavingComponent,
    EditTaxDeclarationFormComponent
  ]
})
export class ProfileModule { }
