import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeWorkTimeService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getFormData(formValue, fileList) {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append("roster", fileList[i]);
    }

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  submitOfficeWorkTime(fileList) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, fileList);
    return this.apiService.post(`${urlConstants.officeWorkTime}`, requestPayload);
  }

  getRosterDetailsByDate(shiftDate) {
    const browserID = this.userService.getBrowerId();
    shiftDate = getFormattedDate(shiftDate)
    return this.apiService.get(`${urlConstants.officeWorkTime}?browser_id=${browserID}&shift_date=${shiftDate}`);
  }
}