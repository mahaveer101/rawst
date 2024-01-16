import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getLeaves() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.leaves}?browser_id=${browserID}`);
  }

  submitLeaveApplication(leaveForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      leave_type_slug: leaveForm.leaveType,
      session_type_slug: leaveForm.sessionType,
      from_date: getFormattedDate(leaveForm.fromDate),
      to_date: getFormattedDate(leaveForm.toDate),
      reason: leaveForm.reason,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.applyLeave}`, payload);
  }

  updateLeave(leaveId, type, rejectionReason) {
    const browserID = this.userService.getBrowerId();
    const payload: any = {
      leave_id: leaveId,
      status: type === 'approve'? '1': '2',
      browser_id: browserID
    };
    if (type === 'reject') {
      payload.rejection_reason = rejectionReason;
    }
    return this.apiService.post(`${urlConstants.updateLeave}`, payload);
  }

  cancelLeave(id, reason) {
    const browserID = this.userService.getBrowerId();
    const payload: any = {
      leave_id: id,
      status: '3',
      cancel_reason: reason,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.updateLeave}`, payload);
  }
}
