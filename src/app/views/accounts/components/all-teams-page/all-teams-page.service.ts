import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { getFormattedDate } from 'app/shared/services/helpers/util.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AllTeamsPageService {

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }
  
  getDepartmentList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.departments}?browser_id=${browserID}`);
  }
  
  getAllTeamsAttendanceData(searchAttendanceForm){
    const start_date = getFormattedDate(searchAttendanceForm.start_date);
    const end_date = getFormattedDate(searchAttendanceForm.end_date);
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allTeamAttendance}?browser_id=${browserID}&start_date=${start_date}&end_date=${end_date}&department_id=${searchAttendanceForm.department_id}`);
  }

  getAllTeamsData(searchForm){
    const date = getFormattedDate(searchForm.date);
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allTeamsPage}?browser_id=${browserID}&date=${date}&department_id=${searchForm.department_id}`);
  }

  getAllTeamsPageDownload(searchForm){
    const date = getFormattedDate(searchForm.date);
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allTeamsPageDownload}?browser_id=${browserID}&date=${date}&department_id=${searchForm.department_id}`);
  }

  getAllAttendanceTeamsPageDownload(searchAttendanceForm){
    const start_date = getFormattedDate(searchAttendanceForm.start_date);
    const end_date = getFormattedDate(searchAttendanceForm.end_date);
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allAttendanceTeamDownload}?browser_id=${browserID}&start_date=${start_date}&end_date=${end_date}&department_id=${searchAttendanceForm.department_id}`);
  }

  getAllTeamsOtHours(searchOtHoursForm){
    const start_date = getFormattedDate(searchOtHoursForm.start_date);
    const end_date = getFormattedDate(searchOtHoursForm.end_date);
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.otHours}?browser_id=${browserID}&start_date=${start_date}&end_date=${end_date}&department_id=${searchOtHoursForm.department_id}`);
  }

  updateOtHours(user, day, otHoursForm) {
    const browserID = this.userService.getBrowerId();
    const payload = {
      user_id: user.id,
      attendance_date: day.attendence_date,
      ot_hours: otHoursForm.ot_hours,
      ot_hours_reason: otHoursForm.ot_hours_reason,
      browser_id: browserID
    };
    return this.apiService.put(`${urlConstants.editOtHours}`, payload);
  }
}
