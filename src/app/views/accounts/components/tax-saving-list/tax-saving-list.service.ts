import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaxSavingListService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }
  getTaxSavingList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.taxSaving}?browser_id=${browserID}`);
  }

  getHouseRentList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allHouseRent}?browser_id=${browserID}`);
  }

  submitTaxSavingForm(taxSavingForm, fileList) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      saving_type_id: taxSavingForm.savingType,
      amount: taxSavingForm.amount,
      saving_year: taxSavingForm.savingYear,
      user_id: taxSavingForm.user.id,
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, fileList);
    return this.apiService.post(`${urlConstants.taxSaving}`, requestPayload);
  }

  getFormData(formValue, fileList) {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append("document[]", fileList[i]);
    }

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  getHouseRentFormData(formValue, fileList) {
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

  getTaxSavingSearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.taxSaving}?browser_id=${browserID}&search=${searchValue}`);
  }

  getHouseRentSearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allHouseRent}?browser_id=${browserID}&search=${searchValue}`);
  }

  updateTaxSavingApproveStatus(taxSavingId, formValue) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      tax_saving_id: taxSavingId,
      approve_amount: formValue.approve_amount,
      tax_saving_status: '1',
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.updateStatus}`, payload);
  }

  updateTaxSavingRejectStatus(taxSavingId) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      tax_saving_id: taxSavingId,
      tax_saving_status: '2',
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.updateStatus}`, payload);
  }

  updateTaxSavingAmount(taxSavingId, formValue) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      tax_saving_id: taxSavingId,
      approve_amount: formValue.approve_amount,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.updateAmount}`, payload);
  }

  submitAllHouseRentForm(formValue, fileList) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      user_id: formValue.user.id,
      rent: formValue.rent,
      address: formValue.address,
      city: formValue.city,
      financial_year: formValue.financial_year,
      from_year_month: moment(formValue?.from_year_month).format('YYYY-MM'),
      to_year_month: moment(formValue?.to_year_month).format('YYYY-MM'),
      browser_id: browserID
    };
    const requestPayload = this.getHouseRentFormData(payload, fileList);
    return this.apiService.post(`${urlConstants.updateAllHouseRent}`, requestPayload);
  }

  updateAllHouseRentForm(houseRentId, formValue) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      house_rent_id: houseRentId,
      rent: formValue.rent,
      from_year_month: moment(formValue?.from_year_month).format('YYYY-MM'),
      to_year_month: moment(formValue?.to_year_month).format('YYYY-MM'),
      address: formValue.address,
      city: formValue.city,
      financial_year: formValue.financial_year,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.editAllHouseRent}`, payload);
  }

  submitUploadDocument(id, uploadDocumentForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      house_rent_id: id,
      browser_id: browserID
    };
    const requestPayload = this.getHouseRentFormData(payload, uploadDocumentForm);
    return this.apiService.post(`${urlConstants.updateDocumentHouseRent}`, requestPayload);
  }
}