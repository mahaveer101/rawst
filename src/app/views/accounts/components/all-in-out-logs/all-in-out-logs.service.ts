import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AllInOutLogsService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getAllUsers() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.user}?browser_id=${browserID}`);
  }

  getAllInOut(date, department_id) {
    const browserID = this.userService.getBrowerId();
    date = getFormattedDate(date)
    return this.apiService.get(`${urlConstants.allInOutLogs}?browser_id=${browserID}&date=${date}&department_id=${department_id}`);
  }
}
