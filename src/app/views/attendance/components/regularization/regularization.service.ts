import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate, getTimeInTwentyFourHours } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RegularizationService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getRegularization() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.regularization}?browser_id=${browserID}`);
  }

  submitRegularizationApplication(regularizationForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      apply_date: getFormattedDate(regularizationForm.applyDate),
      from_time: getTimeInTwentyFourHours(regularizationForm.fromTime),
      to_time: getTimeInTwentyFourHours(regularizationForm.toTime),
      reason: regularizationForm.reason,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.applyRegularization}`, payload);
  }

  updateRegularization(id, type,  rejectionReason) {
    const browserID = this.userService.getBrowerId();
    const payload: any = {
      regularization_id: id,
      status: type === 'approve'? '1': '2',
      browser_id: browserID
    };
    if (type === 'reject') {
      payload.rejection_reason = rejectionReason;
    }
    return this.apiService.put(`${urlConstants.updateRegularization}`, payload);
  }
}
