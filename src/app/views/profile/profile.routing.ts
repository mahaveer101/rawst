import { Routes } from "@angular/router";
import { MyAssetsComponent } from "./components/my-assets/my-assets.component";
import { SalaryComponent } from "./components/salary/salary.component";
import { TaxComponent } from "./components/tax/tax.component";
import { TeamComponent } from "./components/team/team.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { EmployeesComponent } from "./components/employees/employees.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: { title: 'Info', breadcrumb: 'Info' }
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        data: { title: 'Employees', breadcrumb: 'Employees' }
      },
      {
        path: 'team',
        component: TeamComponent,
        data: { title: 'My Team', breadcrumb: 'My Team' }
      },
      {
        path: 'assets',
        component: MyAssetsComponent,
        data: { title: 'My Assets', breadcrumb: 'My Assets' }
      },
      {
        path: 'salary',
        component: SalaryComponent,
        data: { title: 'Salary', breadcrumb: 'Salary' }
      },
      {
        path: 'tax',
        component: TaxComponent,
        data: { title: 'Tax', breadcrumb: 'Tax' }
      }
    ]
  }
];