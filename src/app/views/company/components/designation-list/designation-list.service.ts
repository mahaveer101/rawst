import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DesignationListService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  getDesignationList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.designations}?browser_id=${browserID}`);
  }

  submitDesignationForm(designationForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      department_id: designationForm.departmentId,
      designation_name: designationForm.designationName,
      check_attendance: designationForm.attendance,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.designations}`, payload);
  }

  updateDesignation(designationForm, rowData) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      id: rowData.id,
      department_id: designationForm.departmentId,
      designation_name: designationForm.designationName,
      check_attendance: designationForm.attendance,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.designations}`, payload);
  }

  submitBulkDesignation(bulkDesignationForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, bulkDesignationForm);
    return this.apiService.post(`${urlConstants.bulkDesignation}`, requestPayload);
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
