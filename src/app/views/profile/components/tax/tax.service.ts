import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  getTaxDetails() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.tax}?browser_id=${browserID}`);
  }

  submitTaxDeclaration(id, fileList) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      users_tax_saving_id: id,
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, fileList);
    return this.apiService.post(`${urlConstants.taxDeclarationDocuments}`, requestPayload);
  }

  getFormData(formValue, fileList) {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append("documents[]", fileList[i]);
    }

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  submitTaxSavingForm(formValue) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      ...formValue,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.tax}`, payload);
  }

  submitHouseRentForm(formValue, fileList) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      ...formValue,
      from_year_month: moment(formValue?.from_year_month).format('YYYY-MM'),
      to_year_month: moment(formValue?.to_year_month).format('YYYY-MM'),
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, fileList);
    return this.apiService.post(`${urlConstants.houseRent}`, requestPayload);
  }

  getHouseRentDetails(){
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.houseRent}?browser_id=${browserID}`);
  }

  getMyTaxDetails(){
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.myTax}?browser_id=${browserID}`)
  }

  getForm16PartADownloadData() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.form16PartA}?browser_id=${browserID}`);
  }

  getForm16PartBDownloadData() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.form16PartB}?browser_id=${browserID}`);
  }

}