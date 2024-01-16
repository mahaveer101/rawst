import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentListService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  getDepartmentList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.departments}?browser_id=${browserID}`);
  }
  
  submitDepartmentForm(departmentForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      department_name: departmentForm.departmentName,
      working_days:departmentForm.workingDays,
      break_time:departmentForm.breakTime,
      show_holiday_list: departmentForm.showHolidayList=== true ? '1': '0',
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.departments}`, payload);
  }

  updateDepartment(departmentForm, rowData) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      id: rowData.id,
      department_name: departmentForm.departmentName,
      working_days:departmentForm.workingDays,
      break_time:departmentForm.breakTime,
      show_holiday_list: departmentForm.showHolidayList === true ? '1': '0',
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.departments}`, payload);
  }

  submitBulkDepartments(bulkDepartmentForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, bulkDepartmentForm);
    return this.apiService.post(`${urlConstants.bulkDepartment}`, requestPayload);
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
