import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AdvancedPaymentService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  getAdvancedPayment() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.advancedPayment}?browser_id=${browserID}`);
  }

  submitAdvancePayment(advancePaymentForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      ...advancePaymentForm,
      start_month_date: this.getFormattedDate(advancePaymentForm.start_month),
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.advancedPayment}`, payload);
  }

  getFormattedDate(date) {
    try {
      const monthAndYear = moment(date).format('yyyy-MM');
      return `${monthAndYear}-01`;
    } catch (e) {
      return '';
    }
  }
}
