import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'attendance/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'attendance',
        loadChildren: () => import('./views/attendance/attendance.module').then(m => m.AttendanceModule),
        data: { title: 'Attendance', breadcrumb: 'Attendance'}
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', breadcrumb: 'Profile'}
      },
      {
        path: 'accounts',
        loadChildren: () => import('./views/accounts/accounts.module').then(m => m.AccountsModule),
        data: { title: 'Accounts', breadcrumb: 'Accounts'}
      },
      {
        path: 'company',
        loadChildren: () => import('./views/company/company.module').then(m => m.CompanyModule),
        data: { title: 'Company', breadcrumb: 'Company'}
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];




