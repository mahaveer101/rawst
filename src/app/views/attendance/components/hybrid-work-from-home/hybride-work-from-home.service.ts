import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HybrideWorkFromHomeService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }
  getHybrideWorkFromHome() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.HybrideWFH}?browser_id=${browserID}`);
  }

  submitHybrideWFH(HybrideWFHForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      approval_start_date: getFormattedDate(HybrideWFHForm.approvalStartDate),
      approval_end_date: getFormattedDate(HybrideWFHForm.approvalEndDate),
      reason: HybrideWFHForm.reason,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.HybrideWFH}`, payload);
  }

  updateHybridWorkFromHome(id, type) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      wfh_advance_approval_id: id,
      status: type === 'approve'? '1': '2',
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.HybrideWFH}`, payload);
  }

}
