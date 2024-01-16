import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class InOutLogsService {

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }
  
  getMyInOut(date) {
    const browserID = this.userService.getBrowerId();
    date = getFormattedDate(date)
    return this.apiService.get(`${urlConstants.inOutLogs}?browser_id=${browserID}&date=${date}`);
  }
}
