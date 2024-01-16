import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getAttendenceRecord() {
    const user = this.userService.getUser() || {};
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.attendencerecord}?user_id=${user.id}&browser_id=${browserID}`);
  }

  submitResetPassword(resetPasswordForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      ...resetPasswordForm,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.forceChangePassword}`, payload);
  }

  markAnnouncementRead(row){
    const browserID = this.userService.getBrowerId();
    const payload = {
      id: row.id,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.markAnnouncementRead}`, payload);
  }
}
