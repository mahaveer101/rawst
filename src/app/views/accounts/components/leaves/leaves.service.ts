import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  constructor(
    private apiService: ApiService,
    private userService: UserService,
  ) { }

  getLeavesList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allLeaves}?browser_id=${browserID}`);
  }

  submitBulkLeaves(bulkLeavesForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, bulkLeavesForm);
    return this.apiService.post(`${urlConstants.bulkLeaves}`, requestPayload);
  }

  getFormData(formValue, file) {
    const formData = new FormData();
    formData.append("file", file);
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  getEmployeesBySearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allLeaves}?browser_id=${browserID}&search=${searchValue}`);
  }
}
