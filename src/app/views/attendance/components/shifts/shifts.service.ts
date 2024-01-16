import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  constructor(
    private userService : UserService,
    private apiService : ApiService
  ) { }
  getUserShiftsList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.userShift}?browser_id=${browserID}`);
  }

  submitUserShiftsForm( userShiftForm ) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      shift_id :userShiftForm.shift.id, 
      user_id: userShiftForm.user.id,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.userUpdateShift}`, payload);
  }

  updateUserShiftsForm( userShiftForm, rowData ) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      user_shift_id: rowData.id,
      user_id: userShiftForm.user.id,
      shift_id :userShiftForm.shift.id,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.userUpdateShift}`, payload);
  }

  getUserShiftBySearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.userShift}?browser_id=${browserID}&search=${searchValue}`);
  }
}
