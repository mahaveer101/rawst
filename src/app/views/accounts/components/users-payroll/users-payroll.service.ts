import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersPayrollService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getUsersPayroll(month, year) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.payrolls}?browser_id=${browserID}&year=${year}&month=${month}`);
  }
  getUsersPayrollDeatils(id) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.payroll}/${id}?browser_id=${browserID}`);
  }

  submitOnCalculateSalary(date) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID,
      date
    };
    return this.apiService.post(`${urlConstants.payrollCalculateSalary}`, payload);
  }

  getPayrollDownloadData(date) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.userPayrollDownload}?browser_id=${browserID}&date=${date}`);
  }

  getPayrollBankTranferDownloadData(date) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.userpayrollBanktransforDownload}?browser_id=${browserID}&date=${date}`);
  }
  
  submitPayroll(rowData, payrollForm){
    const browserID = this.userService.getBrowerId();
    for (let each of payrollForm.extra) {
      each.amount = Number(each.amount);
    }
    const payload = {
      payroll_id: rowData.id,
      ...payrollForm,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.updatePayroll}`, payload);
  }
}
