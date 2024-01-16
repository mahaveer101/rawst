import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
 

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  getTeamList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.teams}?browser_id=${browserID}`);
  }

  getTimesheetByMonth(month) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.teams}?browser_id=${browserID}&date=${month}`);
  }
 
}
