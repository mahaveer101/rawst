import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CompOffService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getCompOff() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.compOff}?browser_id=${browserID}`);
  }

  submitCompOff(compOffForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      comp_off_date: getFormattedDate(compOffForm.comp_off_date),
      reason: compOffForm.reason,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.ApplyCompOff}`, payload);
  }

  updateCompOff(id, type, rejectionReason) {
    const browserID = this.userService.getBrowerId();
    const payload: any = {
      comp_off_id: id,
      status: type === 'approve'? '1': '2',
      browser_id: browserID
    };
    if (type === 'reject') {
      payload.rejection_reason = rejectionReason;
    }
    return this.apiService.put(`${urlConstants.updateCompOff}`, payload);
  }
}
