import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  getAllTeamsAttendanceData(searchForm){
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allTeamAttendancePage}?browser_id=${browserID}&date=${this.getFormattedMonthAndYear(searchForm.date)}&department_id=${searchForm.department_id}`);
  }

  getAllTeamsAttendanceDownload(searchForm){
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allTeamAttendanceDownload}?browser_id=${browserID}&date=${this.getFormattedMonthAndYear(searchForm.date)}&department_id=${searchForm.department_id}`);
  }

  getDepartmentList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.departments}?browser_id=${browserID}`);
  }

  getFormattedMonthAndYear(date) {
    try {
      return moment(date).format('yyyy-MM');
    } catch (e) {
      return '';
    }
  }

  updateUserAttendanceNCNS(user, day, formValue) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      user_id: user.id,
      attendance_date: day.attendence_date,
      attendance: formValue.attendance,
      browser_id: browserID
    };

    return this.apiService.put(`${urlConstants.attendanceNcns}`, payload);
  }

  
}