import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getTimesheet() {
    const browserID = this.userService.getBrowerId();
    return new Observable(observer => {
      this.apiService.get(`${urlConstants.timesheet}?browser_id=${browserID}`).subscribe({
        next: (response) => {
          observer.next(this.getPreparedTimesheetData(response));
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  getTimesheetByMonth(month) {
    const browserID = this.userService.getBrowerId();
    return new Observable(observer => {
      this.apiService.get(`${urlConstants.timesheet}?browser_id=${browserID}&date=${month}`).subscribe({
        next: (response) => {
          observer.next(this.getPreparedTimesheetData(response));
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  getPreparedTimesheetData(response) {
    const preparedTimesheet = [];
    const timesheet = response?.time_sheet || [];
    const attendence = response?.attendence || {};
    for (let each of timesheet) {
      const colorAndTitle = this.getColorAndTitle(each, attendence);
      const date = each?.attendence_date?.replace(/-/g, '\/');
      preparedTimesheet.push(
        {
          _id: each.id,
          type: each.attendence,
          start: new Date(date),
          allDay: true,
          title: colorAndTitle.title,
          color: colorAndTitle.color,
          meta: each
        }
      );
    }
    return preparedTimesheet;
  }

  getColorAndTitle(dataItem, types) {
    return ({
      title: this.getTitle(dataItem, types),
      color: {
        primary: types[dataItem.attendence]?.color,
        secondary: types[dataItem.attendence]?.color
      }
    });
  }

  getTitle(dataItem, types) {
    return `${types[dataItem.attendence]?.name || dataItem.attendence}`;
  }

  submitBulkTimesheet(bulkTimesheetForm){
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    const requestPayload = this.getFormData(payload, bulkTimesheetForm);
    return this.apiService.post(`${urlConstants.bulkTimesheet}`, requestPayload);
  }

  getFormData(formValue, file) {
    const formData = new FormData();
    formData.append("file", file);
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
}
