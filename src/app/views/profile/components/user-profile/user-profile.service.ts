import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getMyProfile() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.userProfile}?browser_id=${browserID}`);
  }

  updateUserProfile(userProfileForm){
    const browserID = this.userService.getBrowerId();
    const payload ={
      ...userProfileForm,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.updateUserProfile}`, payload);
  }
  
  updateUserAddress(userAddressForm){
    const browserID = this.userService.getBrowerId();
    const payload ={
      ...userAddressForm,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.updateUserAddress}`, payload);
  }

  getFormData(formValue, fileList) {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append("profile_pic", fileList[i]);
    }

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  submitProfileImage(fileList) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, fileList);
    return this.apiService.post(`${urlConstants.updateProfilePic}`, requestPayload);
  }

  deleteProfilePic(){
    const browserID = this.userService.getBrowerId();
    const payload ={
      browser_id: browserID
    };
    return this.apiService.delete(`${urlConstants.deleteProfilePic}`, payload);
  }

}
