import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class WfhService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  getWfhAttendance() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.wfh}?browser_id=${browserID}`);
  }

  getWfhAttendanceApprove(prev_date) {
    const browserID = this.userService.getBrowerId();
    prev_date = getFormattedDate(prev_date)
    return this.apiService.get(`${urlConstants.wfhApprovePrevRecords}?browser_id=${browserID}&prev_date=${prev_date}`);
  }

  getMyWfh(from_date, to_date) {
    const browserID = this.userService.getBrowerId();
    from_date = getFormattedDate(from_date);
    to_date = getFormattedDate(to_date);
    return this.apiService.get(`${urlConstants.wfhMyRecords}?browser_id=${browserID}&from_date=${from_date}&to_date=${to_date}`);
  }

  submitWfh(attendance_date, approved_user) {
    const browser_id = this.userService.getBrowerId();
    const payload = {
      attendance_date,
      approved_user,
      browser_id
    }
    return this.apiService.post(`${urlConstants.wfh}`, payload);
  }

  updatePrevWfh(id, prevDate) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      attendance_date: getFormattedDate(prevDate),
      approved_user: [id],
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.wfh}`, payload);
  }
}
