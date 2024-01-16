import { Routes } from "@angular/router";
import { CompanyComponent } from "./components/company/company.component";
import { DepartmentListComponent } from "./components/department-list/department-list.component";
import { DesignationListComponent } from "./components/designation-list/designation-list.component";
import { NoticeBoardAnnouncementComponent } from "./components/notice-board-announcement/notice-board-announcement.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: CompanyComponent,
        data: { title: 'Info', breadcrumb: 'Info' }
      },
      {
        path: 'notice_board_announcement',
        component: NoticeBoardAnnouncementComponent,
        data: { title: 'Announcements', breadcrumb: 'Announcements' }
      },
      {
        path: 'department-list',
        component: DepartmentListComponent,
        data: { title: 'Departments', breadcrumb: 'Departments' }
      },
      {
        path: 'designation-list',
        component: DesignationListComponent,
        data: { title: 'Designations', breadcrumb: 'Designations' }
      }
    ]
  }
];