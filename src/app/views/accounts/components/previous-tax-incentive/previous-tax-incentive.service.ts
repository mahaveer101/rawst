import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PreviousTaxIncentiveService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  getEmployeePreviousTaxAndIncentive() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.user}?browser_id=${browserID}`);
  }

  getEmployeesBySearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.user}?browser_id=${browserID}&search=${searchValue}`);
  }

  getSavedTaxIncentive(user_id) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.savedIncentive}?user_id=${user_id}&browser_id=${browserID}`);
  }

  submitPreviousTax(taxForm, user_id) {
    const payload = {
      user_id,
      ...taxForm,
      browser_id: this.userService.getBrowerId()
    };
    return this.apiService.post(`${urlConstants.previousTax}`, payload);
  }

  submitPreviousIncentive(incentiveForm, user_id) {
    const payload = {
      user_id,
      ...incentiveForm,
      browser_id: this.userService.getBrowerId()
    };
    return this.apiService.post(`${urlConstants.previousIncentive}`, payload);
  }

  
  submitBulkPreviousTax(bulkPreviousTaxForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, bulkPreviousTaxForm);
    return this.apiService.post(`${urlConstants.bulkPreviousTax}`, requestPayload);
  }

  submitBulkPreviousIncentive(bulkPreviousIncentiveForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, bulkPreviousIncentiveForm);
    return this.apiService.post(`${urlConstants.bulkPreviousIncentive}`, requestPayload);
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
}
