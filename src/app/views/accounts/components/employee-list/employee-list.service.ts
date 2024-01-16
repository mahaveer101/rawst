import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {

  private httpClient: HttpClient;
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private httpBackend: HttpBackend
  ) { 
    this.httpClient = new HttpClient(httpBackend);
  }

  getEmployeeList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.user}?browser_id=${browserID}`);
  }

  submitEmployeeForm(employeeForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      name: employeeForm.name,
      emp_no:employeeForm.empNo,
      father_name: employeeForm.fatherName,
      aadhar_card: employeeForm.aadharCard,
      pan_card: employeeForm.panCard,
      phone: employeeForm.phoneNumber,
      dob: getFormattedDate(employeeForm.dob),
      email: employeeForm.email,
      password: employeeForm.password,
      c_password: employeeForm.confirmPassword,
      role_id: employeeForm.roleId.toString(),
      doj: getFormattedDate(employeeForm.doj),
      parent_id: employeeForm.parent.id.toString(),
      user_type: employeeForm.userType.toString(),
      department_id: employeeForm.departmentId.toString(),
      designation_id: employeeForm.designationId.toString(),
      gender: employeeForm.gender,
      street_address: employeeForm.streetAddress,
      pincode: employeeForm.pincode,
      city: employeeForm.city,
      state: employeeForm.state,
      country: employeeForm.country,
      education: employeeForm.education,
      blood_group: employeeForm.bloodGroup,
      timezone: employeeForm.timezone,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.user}`, payload);
  }

  getEmployeeDetails(id) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.users}/${id}?browser_id=${browserID}`);
  }

  updateEmployee(employeeForm, rowData) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      id: rowData.id,
      name: employeeForm.name,
      emp_no: employeeForm.empNo,
      father_name: employeeForm.fatherName,
      aadhar_card: employeeForm.aadharCard,
      pan_card: employeeForm.panCard,
      phone: employeeForm.phoneNumber,
      dob: getFormattedDate(employeeForm.dob),
      date_of_relieving: employeeForm.dateOfRelieving? getFormattedDate(employeeForm.dateOfRelieving): null,
      email: employeeForm.email,
      role_id: employeeForm.roleId.toString(),
      doj: getFormattedDate(employeeForm.doj),
      parent_id: employeeForm.parent.id.toString(),
      user_type: employeeForm.userType.toString(),
      department_id: employeeForm.departmentId.toString(),
      designation_id: employeeForm.designationId.toString(),
      gender: employeeForm.gender,
      street_address: employeeForm.streetAddress,
      pincode: employeeForm.pincode,
      city: employeeForm.city,
      state: employeeForm.state,
      country: employeeForm.country,
      education: employeeForm.education,
      blood_group: employeeForm.bloodGroup,
      timezone: employeeForm.timezone,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.user}`, payload);
  }

  getEmployeesBySearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.user}?browser_id=${browserID}&search=${searchValue}`);
  }

  updateCheckAttendance(user_id, check_attendance){
    const browserID = this.userService.getBrowerId();
    const payload= {
      browser_id: browserID,
      check_attendance,
      user_id
    };
    return this.apiService.put(`${urlConstants.checkAttendance}`, payload);
  }

  updateCheckAllowanceAttendance(user_id, attendance_allowance_status){
    const browserID = this.userService.getBrowerId();
    const payload= {
      browser_id: browserID,
      attendance_allowance_status,
      user_id
    };
    return this.apiService.put(`${urlConstants.attendanceAllowance}`, payload);
  }

  updateOtStatus(user_id, ot_status){
    const browserID = this.userService.getBrowerId();
    const payload= {
      browser_id: browserID,
      ot_status,
      user_id
    };
    return this.apiService.put(`${urlConstants.attendanceOt}`, payload);
  }

  updateMetroCityStatus(user_id, is_metro_city){
    const browserID = this.userService.getBrowerId();
    const payload= {
      browser_id: browserID,
      is_metro_city,
      user_id
    };
    return this.apiService.put(`${urlConstants.attendanceMetroCity}`, payload);
  }

  submitResetPassword(changePasswordForm, rowData){
    const browserID = this.userService.getBrowerId();
    const payload= {
      browser_id: browserID ,
      id: rowData.id,
      password: changePasswordForm.password, 
      c_password: changePasswordForm.confirmPassword   
    };
    return this.apiService.put(`${urlConstants.resetPassword}`, payload);
  }

  getStateCityAndCountryByPincode(pincode) {
    return this.httpClient.get(`https://api.postalpincode.in/pincode/${pincode}`).pipe(
      map((response: any) => {
        return response && response[0] && response[0]?.PostOffice?.length > 0 ?
          {
            city: response[0]?.PostOffice[0].Name,
            country: response[0]?.PostOffice[0].Country,
            state: response[0]?.PostOffice[0].State
          }: {
            city: '',
            country: '',
            state: ''
          };
      })
    );
  }

  submitBulkEmployes(bulkEmployeeForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, bulkEmployeeForm);
    return this.apiService.post(`${urlConstants.bulkEmployees}`, requestPayload);
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

  updatePfEsic(pfEsicForm, rowData){
    const browserID = this.userService.getBrowerId();
    const payload = {
      id: rowData.id,
      pf_no: pfEsicForm.pfNo,
      pf_doj: getFormattedDate(pfEsicForm.pfDoj),
      esic_no:pfEsicForm.esicNo,
      esic_doj:getFormattedDate(pfEsicForm.esicDoj),
      browser_id: browserID
    }
    return this.apiService.put(`${urlConstants.pfEsicUpdate}`, payload);
  }
}
