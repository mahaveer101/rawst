import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoticeBoardAnnouncementService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  getAnnouncementsList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.announcements}?browser_id=${browserID}`);
  }

  getAnnouncementBySearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.announcements}?browser_id=${browserID}&search=${searchValue}`);
  }

  submitAnnouncementForm(announcementForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      department_id: announcementForm.departmentId,
      announcement: announcementForm.announcement,
      type:announcementForm.type,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.announcements}`, payload);
  }

  updateAnnouncements(announcementForm, rowData) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      announcement_id: rowData.id,
      announcement: announcementForm.announcement,
      type:announcementForm.type,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.announcements}`, payload);
  }
}
