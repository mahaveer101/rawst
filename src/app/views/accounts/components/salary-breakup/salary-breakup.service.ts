import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryBreakupService {

  constructor(
     private apiService: ApiService,
    private userService: UserService
  ) { }

  getSalaryBreakupList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.banks}?browser_id=${browserID}`);
  }

  submitSalaryBreakupForm(salaryBreakupForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      user_id: salaryBreakupForm.user.id,
      beneficiary_ac_no: salaryBreakupForm.beneficiaryAcNo,
      beneficiary_name: salaryBreakupForm.beneficiaryName,
      ifsc_no: salaryBreakupForm.ifscNo,
      bank_name: salaryBreakupForm.bankName,
      basic: salaryBreakupForm.basic,
      hra: salaryBreakupForm.hra,
      conv: salaryBreakupForm.conveyance,
      other: salaryBreakupForm.other,
      pf_status: salaryBreakupForm.pfStatus === true? '1': '0',
      pf: salaryBreakupForm.pf,
      esic: salaryBreakupForm.esic,
      lwf: salaryBreakupForm.lwf,
      adv: salaryBreakupForm.adv,
      tds: salaryBreakupForm.tds,
      previous_tds: salaryBreakupForm.previousTds,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.bank}`, payload);
  }

  getSalaryBreakupDetails(id){
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.bank}/${id}?browser_id=${browserID}`);
  }

  submitBulkSalaryBreakups(bulkSalaryBreakupForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, bulkSalaryBreakupForm);
    return this.apiService.post(`${urlConstants.bulkSalaryBreakup}`, requestPayload);
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

  getSalaryBreakupEmployeeBySearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.banks}?browser_id=${browserID}&search=${searchValue}`);
  }
}
