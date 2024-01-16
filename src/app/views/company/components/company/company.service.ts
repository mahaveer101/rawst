import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }


  getCompany() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.company}?browser_id=${browserID}`);
  }

  onSubmitHolidayForm(holidayForm, companyId) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      company_id: companyId,
      holiday_name: holidayForm.holidayName,
      holiday_date: getFormattedDate(holidayForm.holidayDate),
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.companyholiday}`, payload);
  }

  updateHoliday(holidayForm, holidayId) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      holiday_id: holidayId,
      holiday_name: holidayForm.holidayName,
      holiday_date: getFormattedDate(holidayForm.holidayDate),
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.companyholiday}`, payload);
  }

  updatePayroll(payrollForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      monthly_cycle: {
        end_date: payrollForm.endDate,
        start_date: payrollForm.startDate
      },
      attendance_allowance: payrollForm.attendanceAllowance,
      over_time_percentage: payrollForm.overTimePercentage,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.companypayroll}`, payload);
  }

  updateCompanyTax(companyTaxForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      tax_settings: {
        declaration: {
          start_date: companyTaxForm.startDate,
          end_date: companyTaxForm.endDate
        },
        standard_deduction: companyTaxForm.standardDeduction,
        surcharges_percentage: companyTaxForm.surchargesPercentage
      },
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.companyTaxUpdate}`, payload);
  }

  updateWorkingHours(workingHoursForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      working_hours_settings: {
        hours: [
          {
            name: 'Standard',
            slug: 'standard',
            value: workingHoursForm.standard
          },
          {
            name: 'Hybrid',
            slug: 'hybrid',
            value: workingHoursForm.hybrid
          },
          {
            name: 'Work From Home',
            slug: 'work_from_home',
            value: workingHoursForm.workFromHome
          },
          {
            name: 'On Duty',
            slug: 'on_duty',
            value: workingHoursForm.onDuty
          }
        ]
      },
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.companyhours}`, payload);
  }

  updateCompany(companyForm) {
    const browserID = this.userService.getBrowerId();
    const payload ={
      company_name: companyForm.companyName,
      email: companyForm.email,
      contact_number: companyForm.contactNumber,
      street_address: companyForm.streetAddress,
      city: companyForm.city,
      state: companyForm.state,
      pincode: companyForm.pincode,
      country: companyForm.country,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.company1}`, payload);
  }

  updateLeaveTypes(leaveTypesForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
        leave_type: [
          {
            name: 'Casual Leave',
            slug: 'casual_leave',
            quota: leaveTypesForm.casualLeaves,
            oneTypeMax: '2',
            isCombine: 'true'
          },
          {
            name: 'Sick Leave',
            slug: 'sick_leave',
            quota: leaveTypesForm.sickLeaves,
            oneTypeMax: '2',
            isCombine: 'true'
          },
          {
            name: 'Earned Leave',
            slug: 'earned_leave',
            quota: leaveTypesForm.earnedLeaves,
            oneTypeMax: '2',
            isCombine: 'true'
          },
          {
            name: 'Short Leave',
            slug: 'short_leave',
            quota: leaveTypesForm.shortLeaves,
            oneTypeMax: '2',
            isCombine: 'true'
          }
        ],
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.companyleaves}`, payload);
  }

  updateGradeTypes(gradeTypesForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      grade_settings: {
        grade: [
          {
            name: 'A+',
            slug: 'a_plus',
            percentage: gradeTypesForm.aPlusGrade
          },
          {
            name: 'A',
            slug: 'a',
            percentage: gradeTypesForm.aGrade
          },
          {
            name: 'B+',
            slug: 'b_plus',
            percentage: gradeTypesForm.bPlusGrade
          },
          {
            name: 'B',
            slug: 'b',
            percentage: gradeTypesForm.bGrade
          },
          {
            name: 'C',
            slug: 'c',
            percentage: gradeTypesForm.cGrade
          }
        ]
      },
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.companygrade}`, payload);
  }


  getFormData(formValue, fileList) {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append("logo", fileList[i]);
    }

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  submitCompanyLogo(fileList) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, fileList);
    return this.apiService.post(`${urlConstants.companyLogo}`, requestPayload);
  }

  deleteCompanyLogo(){
    const browserID = this.userService.getBrowerId();
    const payload ={
      browser_id: browserID
    };
    return this.apiService.delete(`${urlConstants.deleteCompanyLogo}`, payload);
  }
}
