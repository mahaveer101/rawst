import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  getSalary() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.salary}?browser_id=${browserID}`);
  }

  getPayslipData() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.salaryPayslip}?browser_id=${browserID}`);
  }

  getSalaryBreakup(){
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.salaryBreakup}?browser_id=${browserID}`);
  }

  getPayslipDownloadData(month, year) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.payslipDownload}?browser_id=${browserID}&month=${month}&year=${year}`);
  }

  getPayslipDataForMonth(payroll_date) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.salaryPayslip}?browser_id=${browserID}&payroll_date=${payroll_date}`);
  }
}
