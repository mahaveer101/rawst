import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class GradesListService {

  constructor(
    private apiService:ApiService,
    private userService: UserService

  ) { }
  getGradesList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.grades}?browser_id=${browserID}`);
  }

  getUserGradeDeatils(id) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.grade}/${id}?browser_id=${browserID}`);
  }
  
  submitFeedback(id, feedbackForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      user_id: id,
      browser_id: browserID,
      ...feedbackForm
    };

    return this.apiService.post(`${urlConstants.grade}`, payload);
  }
}
