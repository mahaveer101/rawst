import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
  hideByRoles?;
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
  hideByChildCount?;
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text 
}

@Injectable()
export class NavigationService {
  defaultMenu: IMenuItem[] = [
    {
      name: 'Attendance',
      type: 'dropDown',
      icon: 'dashboard',
      tooltip: 'Attendance',
      hideByRoles: [],
      sub: [
        { name: 'Dashboard', state: 'attendance/dashboard' },
        { name: 'In/Out', state: 'attendance/in-out' },
        { name: 'Leaves', state: 'attendance/leaves' },
        { name: 'Regularization', state: 'attendance/regularization' },
        { name: 'Timesheet', state: 'attendance/timesheet' },

        {
          name: 'Work From Home',
          type: 'dropDown',
          sub:[
            { name: 'Daily Approval', state: 'attendance/wfh' },
            { name: ' Hybrid', state: 'attendance/hybrid-work-from-home' },
          ]
        },
        { 
          name: 'Roster', 
          state: 'attendance/office-work-time'
        },
        {
          name: 'Shifts',
          type: 'dropDown',
          sub:[
            { name: 'List', state: 'attendance/shifts-list' },
            { name: 'Assign', state: 'attendance/shifts-assign' },
          ]
        },

        { name: 'Comp-Off', state: 'attendance/comp-off' },
      ]
    },
    {
      name: 'Profile',
      type: 'dropDown',
      icon: 'person',
      tooltip: 'Profile',
      hideByRoles: [],
      sub: [
        { name: 'Info', state: 'profile/profile' },
        { name: 'My Team', state: 'profile/team' },
        { name: 'Employees', state: 'profile/employees' },
        { name: 'My Assets', state: 'profile/assets' },
        { name: 'Salary', state: 'profile/salary' },
        { name: 'Tax', state: 'profile/tax' }
      ]
    },
    {
      name: 'Accounts',
      type: 'dropDown',
      icon: 'account_circle',
      tooltip: 'Accounts',
      hideByRoles: ['5'],
      sub: [
        {
          name: 'Employee',
          type: 'dropDown',
          sub:[
            { name: 'List', state: 'accounts/employee-list' },
            { name: 'In/Out', state: 'accounts/all-in-out' },
            { name: 'Assets', state: 'accounts/assets-list' },
            // { name: 'Attendance', state: 'accounts/attendance' },
          ]
        },
       
        { name: 'Leaves', state: 'accounts/leaves' },
        { name: 'Teams', state: 'accounts/all-teams-page' },
        { name: 'Previous Tax And Incentive', state: 'accounts/previous-tax-incentive' },
        {
          name: 'Salary',
          type: 'dropDown',
          sub:[
            { name: 'Salary Breakup', state: 'accounts/salary-breakup' },
            { name: 'Advance Payment', state: 'accounts/advanced-payment' },
            { name: 'Payroll', state: 'accounts/payroll' },
          ]
        },
        {
          name: 'Tax',
          type: 'dropDown',
          sub:[
            { name: 'Savings', state: 'accounts/tax' },
            { name: 'Form-16', state: 'accounts/form16' },
            { name: 'Calculation', state: 'accounts/calculation' },
          ]
        },
        {
          name: 'Shifts',
          type: 'dropDown',
          sub:[
            { name: 'All Shift-List', state: 'accounts/shift-list' },
            { name: 'All Shift Assign', state: 'accounts/all-shift' },
          ]
        },
        { name: 'Perfomance', state: 'accounts/grades-list' },
      ]
    },
    {
      name: 'Company',
      type: 'dropDown',
      icon: 'workspaces',
      tooltip: 'Company',
      hideByRoles: ['5'],
      sub: [
        { name: 'Info', state: 'company/info' },
        { name: 'Departments', state: 'company/department-list' },
        { name: 'Designations', state: 'company/designation-list' },
        { name: 'Announcements', state: 'company/notice_board_announcement' }
      ]
    },

  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  constructor() { }

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  // PLEASE VIEW THE EGRET FULL VERSION CODE
  publishNavigationChange(menuType: string) {
    this.menuItems.next(this.defaultMenu);
    // switch (menuType) {
    //   case 'separator-menu':
    //     this.menuItems.next(this.defaultMenu);
    //     break;
    //   case 'icon-menu':
    //     this.menuItems.next(this.iconMenu);
    //     break;
    //   default:
    //     this.menuItems.next(this.plainMenu);
    // }
  }
}
