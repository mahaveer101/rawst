import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AssetsListService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getAssetsList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.userAssets}?browser_id=${browserID}`);
  }

  submitAssetApplication(assetsForm, fileList) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      ...assetsForm,
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, fileList);
    return this.apiService.post(`${urlConstants.assets}`, requestPayload);
  }

  getFormData(formValue, fileList) {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append("image[]", fileList[i]);
    }

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  getAssetsDeatils(id) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.assets}/${id}?browser_id=${browserID}`);
  }

  updateAssetsDetails(userId, assetDetails, assetForm) {
    const browserID = this.userService.getBrowerId();
    const payload= {
      user_id: userId,
      id: assetDetails.id,
      ...assetForm,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.assets}`, payload);
  }
}
