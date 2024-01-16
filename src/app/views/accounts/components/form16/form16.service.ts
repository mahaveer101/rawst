import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class Form16Service {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  submitForm16FormA(filePartA) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, filePartA);
    return this.apiService.post(`${urlConstants.form16PartA}`, requestPayload);
  }

  submitForm16FormB(filePartB) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, filePartB);
    return this.apiService.post(`${urlConstants.form16PartB}`, requestPayload);
  }

  getFormData(formValue, file) {
    const formData = new FormData();
    formData.append("document", file);
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
}
