import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { LeaveApplicationFormComponent } from '../leave-application-form/leave-application-form.component';
import { LeavesService } from './leaves.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
  animations: egretAnimations
})
export class LeavesComponent implements OnInit {

  leaves: any;
  holidays = [];
  leavesQuota: any = {};
  appliedLeaves = [];
  appliedLeave = [];
  approvalLeaves = [];
  approvedLeaves = [];
  teamMembers = [];
  holidaysPeriod = '';
  appliedLeavesDisplayedColumns = [
    'name',
    'leave_type',
    'reason',
    'from_date',
    'to_date',
    'status_name',
    'actions'
  ];
  approvalLeavesDisplayedColumns = [
    'leave_type',
    'applied_by',
    'reason',
    'from_date',
    'to_date',
    'status_name',
    'actions'
  ];
  approvedLeavesDisplayedColumns = [
    'leave_type',
    'applied_by',
    'reason',
    'from_date',
    'to_date',
    'status_name',
    'actions'
  ];
  rejectionReason = '';
  cancelReason = '';

  constructor(
    private leavesService: LeavesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getLeavesData();
  }

  getLeavesData() {
    this.leavesService.getLeaves().subscribe((response: any) => {
      this.leaves = response;
      this.holidays = response?.holiday_calender || [];
      this.leavesQuota = response?.leave_quota || {};
      this.appliedLeaves = response?.applied_leave || [];
      this.approvalLeaves = response?.approval_leave || [];
      this.approvedLeaves = response?.approved_leave || [];
      this.teamMembers = response?.team || [];
      this.holidaysPeriod = this.holidays.length > 0 ? this.holidays[0].year_period: '';
    });
  }

  getPercentage(remaining, total) {
    if (remaining && total) {
      return Math.round((100 * remaining) / total);
    }
    return 0;
  }

  openLeaveApplicationForm() {
    const dialogRef = this.dialog.open(LeaveApplicationFormComponent, 
      {
        width: '400px'
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getLeavesData();
      }
    });
  }

  openConfirmation(leaveId: string, type: string, templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.leavesService.updateLeave(leaveId, type, this.rejectionReason).subscribe(res => {
          this.getLeavesData();
        });
      }
      this.rejectionReason = '';
    });
  }

  cancelLeave(id, templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.leavesService.cancelLeave(id, this.cancelReason).subscribe(res => {
          this.getLeavesData();
        });
      }
      this.cancelReason = '';
    });
  }
}
