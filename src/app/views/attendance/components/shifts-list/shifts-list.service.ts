import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getTimeInTwentyFourHours } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftsListService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getShiftsList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.companyShifts}?browser_id=${browserID}`);
  }

  submitShiftsForm(shiftstForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      ...shiftstForm,
      shift_start_time: getTimeInTwentyFourHours(shiftstForm.shift_start_time),
      shift_end_time: getTimeInTwentyFourHours(shiftstForm.shift_end_time),
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.companyShiftsUpdate}`, payload);
  }

  updateShift(shiftstForm, rowData) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      shift_id: rowData.id,
      ...shiftstForm,
      shift_start_time: getTimeInTwentyFourHours(shiftstForm.shift_start_time),
      shift_end_time: getTimeInTwentyFourHours(shiftstForm.shift_end_time),
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.companyShiftsUpdate}`, payload);
  }

  getShiftBySearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.companyShifts}?browser_id=${browserID}&search=${searchValue}`);
  }
}
